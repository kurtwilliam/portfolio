import React, { Component } from 'react';
import proptypes from 'prop-types';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import Score from './Score';

import Chunk from '../../shared/Chunk';
import TargetContainer from './TargetContainer';

// OnClick for chunk that mkes bullet hole...?
// onclick for target that adds to counter?

const GET_SCORE = gql`
  query score {
    score
  }
`;

const INCREMENT_SCORE = gql`
  mutation incrementScore($score: Int) {
    increaseScore(score: $score)
  }
`;

class Shooter extends Component {
  state = {
    score: 0,
    x: 0,
    y: 0,
    duration: 1,
  };

  componentDidMount() {
    this.generateStyles();
    setInterval(() => this.generateStyles(), 2000);
  }

  targetClicked = () => this.setState(state => ({
    score: (state.score += 1),
  }));

  generateStyles = () => {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 3;

    this.setState({ x, y, duration });
  };

  render() {
    const {
      score, x, y, duration,
    } = this.state;
    return (
      <Chunk>
        <Query query={GET_SCORE}>
          {({ loading, error, data }) => {
            if (loading) return <p>Fetching Score...</p>;
            if (error) return <p>Oh no! {error}</p>;

            return <Score>Score: {data.score}</Score>;
          }}
        </Query>
        <Mutation mutation={INCREMENT_SCORE} refetchQueries={() => ['score']}>
          {(increaseScore, { data }) => (
            <TargetContainer
              onClick={() => increaseScore({ variables: { score: 1 } })}
              x={x}
              y={y}
              duration={duration}
            />
          )}
        </Mutation>
      </Chunk>
    );
  }
}

export default Shooter;
