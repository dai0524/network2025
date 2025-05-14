import React from 'react';
import Square from './Square';

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        key={i}
      />
    );
  }

  render() {
    const boardRows = [0, 1, 2].map(row => {
      const rowSquares = [0, 1, 2].map(col =>
        this.renderSquare(row * 3 + col)
      );
      return <div className="board-row" key={row}>{rowSquares}</div>;
    });

    return <div>{boardRows}</div>;
  }
}

export default Board;
