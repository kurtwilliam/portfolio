import React, { Component } from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import Score from "./Score";

import Chunk from "../../shared/Chunk";
import ChunkDesc from "../../shared/ChunkDesc";
import TargetContainer from "./TargetContainer";

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
    x: 0,
    y: 0,
    duration: 1
  };

  componentDidMount() {
    const { duration } = this.state;
    this.generateStyles();
    setTimeout(() => this.generateStyles(), duration * 1000);
  }

  runGenerateStyles = () => this.generateStyles();

  generateStyles = () => {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 5;

    this.setState({ x, y, duration });
    setTimeout(() => this.runGenerateStyles(), duration * 1000);
  };

  render() {
    const { x, y, duration } = this.state;

    return [
      <Chunk key="chunk">
        <Query query={GET_SCORE}>
          {({ loading, error, data }) => {
            if (loading) return <p>Fetching Score...</p>;
            if (error) return <p>Oh no! {error}</p>;

            return <Score>Score: {data.score}</Score>;
          }}
        </Query>
        <Mutation mutation={INCREMENT_SCORE} refetchQueries={() => ["score"]}>
          {(increaseScore, { data }) => (
            <TargetContainer x={x} y={y} duration={duration} key={x + y}>
              <div onClick={() => increaseScore({ variables: { score: 1 } })}>
                <div onClick={() => increaseScore({ variables: { score: 2 } })}>
                  <div
                    onClick={() => increaseScore({ variables: { score: 3 } })}
                  />
                </div>
              </div>
            </TargetContainer>
          )}
        </Mutation>
      </Chunk>,
      <ChunkDesc key="desc">
        Shooting game! The score is global, everyone adds to it. Uses React,
        GraphQL, Apollo Server, and Now.
      </ChunkDesc>
    ];
  }
}

export default Shooter;
