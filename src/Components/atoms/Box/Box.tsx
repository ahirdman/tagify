import './Box.scss';

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const Box = ({ children }: IProps) => {
  return <div className="box">{children}</div>;
};

export default Box;
