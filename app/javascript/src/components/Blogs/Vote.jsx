import React, { useState } from "react";

import { DownArrow, UpArrow } from "@bigbinary/neeto-icons";
import axios from "axios";

const Vote = ({ upvotes, downvotes, slug, vote_type }) => {
  const [showUpvotes, setShowUpvotes] = useState(upvotes);
  const [showDownvotes, setShowDownvotes] = useState(downvotes);
  const [showNetVotes, setShowNetVotes] = useState(showUpvotes - showDownvotes);
  const [showVoteType, setShowVoteType] = useState(vote_type);

  const handleVote = async voteType => {
    try {
      const {
        data: {
          upvotes: fetchedUpvotes,
          downvotes: fetchedDownvotes,
          net_votes: fetchedNetVotes,
          vote_type: fetchedVoteType,
        },
      } = await axios.post(`/api/v1/posts/${slug}/vote`, {
        vote_type: voteType,
      });

      setShowUpvotes(fetchedUpvotes);
      setShowDownvotes(fetchedDownvotes);
      setShowNetVotes(fetchedNetVotes);
      setShowVoteType(fetchedVoteType);
    } catch (error) {
      logger.error("Error voting:", error);
    }
  };

  return (
    <div className="post-card">
      <div className="votes flex flex-col items-center">
        <UpArrow
          color={showVoteType === "upvote" ? "#008000" : "#1e1e20"}
          onClick={() => handleVote(1)}
        />
        <div>{showNetVotes}</div>
        <DownArrow
          color={showVoteType === "downvote" ? "#FF0000" : "#1e1e20"}
          onClick={() => handleVote(-1)}
        />
      </div>
      {showNetVotes >= 40 && <span className="bloggable-tag">Blog it</span>}
    </div>
  );
};

export default Vote;
