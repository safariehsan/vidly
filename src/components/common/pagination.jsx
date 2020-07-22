import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = props => {
    const {pageSize, itemsCount, onPageChange, currentPage} = props;
    const pageCount = Math.ceil(itemsCount / pageSize);
    if(pageCount === 1) return null;
    // [1, ...pageCount].map()
    const pages = _.range(1, pageCount+1);

    return (
        <nav aria-label="Page navigation example">
        <ul className="pagination">
            {pages.map(
                page =>(<li key={page} className={ page === currentPage ? 'page-item active' : 'page-item'}>
                    <a className="page-link" onClick={()=>onPageChange(page)}>{page}</a></li>)
            )}
            
        </ul>
        </nav>
    );
}
 
Pagination.propTypes = {
    pageSize: PropTypes.number.isRequired, 
    itemsCount: PropTypes.number.isRequired, 
    currentPage: PropTypes.number, 
    onPageChange: PropTypes.func.isRequired, 
};
export default Pagination;