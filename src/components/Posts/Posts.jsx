import React, {Component} from "react";
import Pagination from "../Pagination/Pagination";
import PostsTable from "../PostsTable/PostsTable";

import _ from 'lodash';
import { paginate } from "../../utils/paginate";

class Posts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            pageSize: 4,
            currentPage: 1,
            sortColumn: {path: 'title', order: 'asc'},
        };
    }

    componentDidMount() {
        fetch("http://localhost:3001/api/posts")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result,
                    });
                    console.log(result)
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                }
            )
    }

    handleDelete = (post) => {
        const posts = this.state.items
                    .filter(p => p.id !== post.id);
                    this.setState({items: posts});
    }

    handlePageChange = (page) => {
        this.setState({currentPage: page});
    }

    handleSort = (path) => {
        const sortColumn = {...this.state.sortColumn};
        if (sortColumn.path === path) {
            sortColumn.order = (sortColumn.order === 'asc' ?
                'desc' : 'asc');
        }
        else {
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }
        this.setState({sortColumn});
    }

    renderSortIcon = (column) => {
        if (column !== this.state.sortColumn.path) {
            return null;
        }
        if (this.state.sortColumn.order === 'asc') {
            return <i className = 'fa fa-sort-asc'></i>
        }
        if (this.state.sortColumn.order === 'desc') {
            return <i className = 'fa fa-sort-desc'></i>
        }
    }

    render() {

        const {items, pageSize, currentPage, sortColumn} = this.state;

        if (!items.length) {
            return <p>Brak wpisów.</p>
        }

        const sorted = _.orderBy(items,
            [sortColumn.path], [sortColumn.order]);

        const posts = paginate(sorted, currentPage, pageSize);

        return (
            <React.Fragment>
                <PostsTable 
                    items = {posts}
                    sortIcon = {this.renderSortIcon}
                    onSort = {this.handleSort}
                    onDelete = {this.handleDelete}/>
                <Pagination 
                    itemsCount = {items.length}
                    pageSize = {this.state.pageSize}
                    currentPage = {this.state.currentPage}
                    onPageChange = {this.handlePageChange}/>
            </React.Fragment>   
        )
    }
};

export default Posts;