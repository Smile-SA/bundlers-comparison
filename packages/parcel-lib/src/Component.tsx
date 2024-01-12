import { add, multiply } from "./helpers";
import { IObject } from "./types";
import logo from 'data-url:./react.svg';
import "./Component.css";

export interface IComponentProps {
  data: IObject[]
}

export default function Component(props: IComponentProps) {
  const { data } = props;
  return (
    <div className="Component">
        <div className="Component__content">
        <img alt="React logo" className="Component__logo" src={logo} />
        <ul className="Component__list">
          <li>Add: {add(...data)}</li>
          <li>Multiply: {multiply(...data)}</li>
        </ul>
      </div>
    </div>
  );
}