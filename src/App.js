import React, {
  Component
} from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import $ from 'jquery';
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

var data = [{
  category: "Sporting Goods",
  price: "$49.99",
  stocked: true,
  name: "Football"
}, {
  category: "Sporting Goods",
  price: "$9.99",
  stocked: true,
  name: "Baseball"
}, {
  category: "Sporting Goods",
  price: "$29.99",
  stocked: false,
  name: "Basketball"
}, {
  category: "Electronics",
  price: "$99.99",
  stocked: true,
  name: "iPod Touch"
}, {
  category: "Electronics",
  price: "$399.99",
  stocked: false,
  name: "iPhone 5"
}, {
  category: "Electronics",
  price: "$199.99",
  stocked: true,
  name: "Nexus 7"
}];


class ProductCategoryRow extends React.Component {
  render() {
    return <tr><th colSpan="2">{this.props.category}</th></tr>;
  }
}

class ProductRow extends React.Component {
  render() {
    var name = this.props.product.stocked ?
      this.props.product.name :
      <span style={{color: 'red'}}>
        {this.props.product.name}
      </span>;
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    var rows = [];
    var lastCategory = null;
    this.props.products.forEach((product) => {
      if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.isStockOnly)) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
    this.handleInStockInputChange = this.handleInStockInputChange.bind(this);
  }
  handleFilterTextInputChange(e) {
    this.props.onFilterTextInput(e.target.value);
  }
  handleInStockInputChange(e) {
    this.props.onInStockInput(e.target.checked);
  }
  render() {
    return (
      <form>
        <input type="text" placeholder="Search..." value={this.props.filterText} onChange={this.handleFilterTextInputChange} />
        <p>
          <input type="checkbox" checked={this.props.isStockOnly} onChange={this.handleInStockInputChange} />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      isStockOnly: false
    };
    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
    this.handleInStockInput = this.handleInStockInput.bind(this);
  }

  handleFilterTextInput(filterText) {
    this.setState({
      filterText: filterText
    });
  }
  handleInStockInput(isStockOnly) {
    this.setState({
      isStockOnly: isStockOnly
    })
  }
  render() {
    return (
      <div>
        <SearchBar 
          filterText={this.state.filterText}
          isStockOnly={this.state.isStockOnly}
          onFilterTextInput = {this.handleFilterTextInput}
          onInStockInput = {this.handleInStockInput}
        />
        <ProductTable products={this.props.products}
          filterText={this.state.filterText}
          isStockOnly={this.state.isStockOnly}
         />
      </div>
    );
  }
}
ReactDOM.render(
  <FilterableProductTable products={data} />,
  document.getElementById('example')
);

export default App;