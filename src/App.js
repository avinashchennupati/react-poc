import React, { Component, Fragment } from 'react'
import { withRouter } from "react-router";
import axios from 'axios'
import './styles.css'
import 'font-awesome/css/font-awesome.min.css';


class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            persons: [],
            open: [],
            selectedValue: {},
            showFilters: false,
            name: {},
            searchText: null,
            personsCopy: [],
            showNoResultsText: false

        }
    }

    componentDidMount() {
        axios.get("http://www.mocky.io/v2/5d8686a032000024b607b40e")
            .then(res => {
                const persons = res.data;
                console.log(persons);

                this.setState({ persons: persons.articles, personsCopy: persons.articles.slice() });

            })


    }
    handleBack = () => {
        this.setState({ isClicked: false })
    }
    handleCancle = () => {
        this.setState({ showFilters: false })
    }
    handleClick = (value) => () => {
        this.setState({ isClicked: true, selectedValue: value })
        // localStorage.setItem("selectedCard", value);
        // this.props.history.push('/Card');
    }

    search = e => {
        if (e.keyCode === 13) {
            console.log('this.state.value..', this.state.value)
        }
    }
    handleInput = (event) => {
        const searchText = event.target.value.toLowerCase();
        const personsCopy = this.state.personsCopy.slice();
        this.setState({ searchText });
        if (searchText.length > 0) {
            const filterItems = personsCopy.filter(value => {
                return (value.title && value.title.toLowerCase().indexOf(searchText) > -1) ||
                    (value.author && value.author.toLowerCase().indexOf(searchText) > -1);
            })
            console.log(filterItems);
            this.setState({ persons: filterItems });
            if (!filterItems.length) {
                this.setState({ showNoResultsText: true })
            } else {
                this.setState({ showNoResultsText: false })
            }
        } else {
            this.setState({ persons: personsCopy })
        }
    }

    handleFilters = () => {
        this.setState({ showFilters: true })
    }
    onAuthorNameChange = (event) => {
        const searchText = event.target.value.toLowerCase();
        const personsCopy = this.state.personsCopy.slice();
        if (searchText.length > 0) {
            const filterItems = personsCopy.filter(value => {
                return value.author && value.author.toLowerCase().indexOf(searchText) > -1;
            })
            this.setState({ persons: filterItems });
            if (!filterItems.length) {
                this.setState({ showNoResultsText: true })
            } else {
                this.setState({ showNoResultsText: false })
            }
        } else {
            this.setState({ persons: personsCopy })
        }
    }
    onSiteNameChange = (event) => {
        const searchText = event.target.value.toLowerCase();
        const personsCopy = this.state.personsCopy.slice();
        if (searchText.length > 0) {
            const filterItems = personsCopy.filter(value => {
                return value.source.name && value.source.name.toLowerCase().indexOf(searchText) > -1;
            })
            this.setState({ persons: filterItems });
            if (!filterItems.length) {
                this.setState({ showNoResultsText: true })
            } else {
                this.setState({ showNoResultsText: false })
            }
        } else {
            this.setState({ persons: personsCopy })
        }
    }
    render() {
        const DATE_OPTIONS = { year: 'numeric', month: 'long', day: 'numeric' };
        const { selectedValue, showNoResultsText } = this.state;
        return (
            <Fragment>
                <nav class="navbar navbar-light bg-light">
                    <a class="navbar-brand" >React POC</a>
                </nav>
                <div className="container">
                    <div className="row form ">
                        <div className="col-md-10 p-0">
                            <input value={this.state.value} type="text" placeholder="search items"
                                className="search form-control" onChange={this.handleInput} onKeyDown={this.search} />
                        </div>
                        <div className="col-md-2">
                            <div className="dropdown">
                                <button className=" btn btns dropdown-toggle" onClick={this.handleFilters} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="fa fa-sliders hi" aria-hidden="true"></i>Filters</button>
                            </div>
                        </div>
                    </div>
                    {this.state.showFilters && <div className="row showfilter">
                        <div className="col-md-6  filter"><h5>filter</h5></div>
                        <div className="col-md-6 cancel"  > <button className="btn btn" onClick={this.handleCancle}> X</button></div>
                        <div className="row moveleft">
                            <div className="col-md-4">
                                <label for="exampleInputPassword1"> Published date</label>
                                <div className="form-group">
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                        <div class="input-group-append">
                                            <span class="input-group-text" id="basic-addon2"><i className="fa fa-calendar"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <label for="exampleInputPassword1"> Author Name</label>
                                <div className="form-group">
                                    <div class="input-group mb-3">
                                        <input type="text" onChange={this.onAuthorNameChange}
                                            class="form-control"
                                            placeholder="Recipient's username"
                                            aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                        <div class="input-group-append">
                                            <span class="input-group-text" id="basic-addon2"><i className="fa fa-user-md"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <label for="exampleInputPassword1"> SiteName</label>
                                <div className="form-group">
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" onChange={this.onSiteNameChange}
                                            placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                        <div class="input-group-append">
                                            <span class="input-group-text" id="basic-addon2"><i className="fa fa-caret-down"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>}
                    <div className="row top">
                        {this.state.isClicked ? <div >
                            <i className="fa fa-2x arrow fa-arrow-left" onClick={this.handleBack}></i>
                            <div className={'col-md-12'} >
                                <div>
                                    <div className="card  mb-5" >
                                        <img src={selectedValue.urlToImage} class="card-img-top" height="400" alt="..." />

                                        <p className="date">{(new Date(selectedValue.publishedAt)).toLocaleDateString('en-US', DATE_OPTIONS)}</p>
                                        <div className="card-body styles">
                                            <div className="card-title">
                                                {selectedValue.title}
                                            </div>
                                            <div className="card-subtitle ">
                                                {selectedValue.author}
                                            </div>
                                            <p><h6 className="text-primary">Description:</h6>{selectedValue.description}</p>
                                            <h6 className="text-primary">Content:</h6> {selectedValue.content}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> : <div className="row">
                                {this.state.persons && this.state.persons.map(value =>
                                    <div className={'col-md-4'} onClick={this.handleClick(value)} >
                                        <div>
                                            <div className="card  mb-5" >
                                                <img src={value.urlToImage} class="card-img-top" height="200" alt="..." />

                                                <p className="date">{(new Date(value.publishedAt)).toLocaleDateString('en-US', DATE_OPTIONS)}</p>


                                                <div className="card-body styles">
                                                    <div className="card-subtitle ">
                                                        <h5>{value.author}</h5>
                                                    </div>
                                                    <div className="card-title">
                                                        <p>{value.title}</p>
                                                    </div>

                                                    <p><h6 className="text-primary">Description:</h6>{value.description}</p>
                                                    <h6 className="text-primary">Content:</h6> {value.content}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {showNoResultsText && <div className="col-md-12">
                                    No Results Found!
                                </div>}
                            </div>}
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default App;



