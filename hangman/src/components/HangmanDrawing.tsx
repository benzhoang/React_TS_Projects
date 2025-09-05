import "../style/HangmanDrawing.scss";

const HEAD = <div className="head" />;

const BODY = <div className="body" />;

const RIGHT_ARM = <div className="right-arm" />;

const LEFT_ARM = <div className="left-arm" />;

const RIGHT_LEG = <div className="right-leg" />;

const LEFT_LEG = <div className="left-leg" />;

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];

type HangmanDrawingProps = {
  numberOfGuesses: number;
};

export const HangmanDrawing = ({ numberOfGuesses }: HangmanDrawingProps) => {
  return (
    <div className="container">
      {BODY_PARTS.slice(0, numberOfGuesses)}
      <div className="line1" />
      <div className="line2" />
      <div className="line3" />
      <div className="line4" />
    </div>
  );
};
