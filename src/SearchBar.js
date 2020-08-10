import React from 'react';

// This function mocks a simple synchronous API to fetch the label list by keyword.
// Example:
//  const val = getLabels('C');
//  console.log(val);
function getLabels(keyword) {
	const allLabels = ['NextActions', 'Someday_Actions', 'Costco', 'Alexa'];
  const result = allLabels
    .filter(function(x) {
      return x.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
    });
  return result;
}

// This function mocks the asynchronous API to fetch the label list by keyword.
// Example:
//  getLabelsAsync/* ('C').then(function(val) {
//     console.log(val);
//  })
function getLabelsAsync(keyword) {
  const result = getLabels(keyword);
  const delay = Math.random() * 800 + 200; // delay 200~1000ms
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, delay, result);
  });
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      tagList: [],
      searchItems: [],
      indexOfAt: -1,
      onAt: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(evt) {
    const { onAt, indexOfAt } = this.state;
    const { value } = evt.target;

    if (onAt) {
      getLabelsAsync(value.slice(indexOfAt + 1)).then((searchItems) => {
        this.setState((prevState) => ({
          searchItems,
        }));
      });
    }
    if (value.slice(-1) === "@") {
      // debugger;
      this.setState((prevState) => ({
        value,
        indexOfAt: value.length - 1,
        onAt: true,
      }));
    } else {
      this.setState((prevState) => {
        return {
          value,
        };
      });
    }
  }

  handleKeyUp(evt) {}

  handleClick(name) {
    const { value, indexOfAt } = this.state;
    this.setState((prevState) => ({
      indexOfAt: -1,
      value: `${value.slice(0, indexOfAt)} @${name} `,
      onAt: false,
      searchItems: [],
      tagList: prevState.tagList.concat({
        name,
        start: indexOfAt + 1,
        end: indexOfAt + name.length + 1,
      }),
    }));
  }

  render() {
    const { tagList, searchItems, value, indexOfAt } = this.state;
    return (
      <div className="row">
        <div className="col-lg-6 col-lg-offset-3 dropdown">
          <div className="input-group">
            <input
              type="text"
              value={value}
              onChange={this.handleChange}
              onKeyUp={this.handleKeyUp}
              className="form-control"
            />
            <span className="input-group-btn">
              <button className="btn btn-default" type="button">
                Go!
              </button>
            </span>
          </div>
        </div>
        <div className="col-lg-6 col-lg-offset-3">
          {tagList.map((tag) => (
            <span
              style={{ left: `${6.996666666666666 * tag.start + 28}px` }}
              class="label label-primary inline-label"
            >
              {tag.name}
            </span>
          ))}
        </div>
        <div className="col-lg-6 col-lg-offset-3">
          <ul
            style={{
              display: `${searchItems.length > 0 ? "block" : "none"}`,
              left: `${6.996666666666666 * indexOfAt + 30}px`,
            }}
            class="dropdown-menu"
            aria-labelledby="dropdownMenu1"
          >
            {searchItems.map((item) => (
              <li>
                <a href="#" onClick={() => this.handleClick(item)}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
};

export default SearchBar;