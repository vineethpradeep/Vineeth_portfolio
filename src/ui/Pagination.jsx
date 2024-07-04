import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const PageNumber = styled.button`
  background: ${(props) => (props.active ? "#62605c" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#62605c")};
  border: 1px solid #62605c;
  border-radius: 5px;
  margin: 0 5px;
  padding: 10px 15px;
  cursor: pointer;
  &:hover {
    background: #62605c;
    color: #fff;
  }
`;

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };
  return (
    <PaginationContainer>
      {Array.from({ length: totalPages }, (_, index) => (
        <PageNumber
          key={index}
          active={index + 1 === currentPage}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </PageNumber>
      ))}
    </PaginationContainer>
  );
};

export default Pagination;
