import PropTypes from 'prop-types';

SharedTableList.propTypes = {
  children: PropTypes.node,
};

function SharedTableList({ children, ...attributes }) {
  return (
    <table className='table-list' {...attributes}>
      {children}
    </table>
  );
}

SharedTableList.Head = function ({ children, ...attributes }) {
  return (
    <thead {...attributes}>
      <tr>{children}</tr>
    </thead>
  );
};

SharedTableList.Head.propTypes = {
  children: PropTypes.node,
};

SharedTableList.Header = function ({ children, ...attributes }) {
  return <th {...attributes}>{children}</th>;
};

SharedTableList.Header.propTypes = {
  children: PropTypes.node,
};

SharedTableList.Body = function ({ children, items, ...attributes }) {
  return (
    <tbody {...attributes}>
      {items.map((item) =>
        children({
          item,
        })
      )}
    </tbody>
  );
};

SharedTableList.Body.propTypes = {
  children: PropTypes.func,
  items: PropTypes.array,
};

SharedTableList.Row = function ({ children, ...attributes }) {
  return <tr {...attributes}>{children}</tr>;
};

SharedTableList.Row.propTypes = {
  children: PropTypes.node,
};

SharedTableList.Cell = function ({ children, ...attributes }) {
  return <td {...attributes}>{children}</td>;
};

SharedTableList.Cell.propTypes = {
  children: PropTypes.node,
};

export default SharedTableList;
