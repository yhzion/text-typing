import "./style.css";
import { promptArray } from "./prompt";
import { useTextTyping } from "./TextTyping";

const app = document.querySelector<HTMLDivElement>("#app")!;

const tt = useTextTyping(app, {
  preloadTextArray: [],
  delay: 5,
});

let index = 0;
let hasNext = () => {
  index++;
  return index < promptArray.length;
};

const read = () => {
  // ramdom delay. range 500 ~ 1000
  const delay = Math.floor(Math.random() * 500) + 500;
  setTimeout(() => {
    tt.push(promptArray[index].text, promptArray[index].hasNext);
    if (hasNext()) {
      read();
    } else {
      tt.stop();
    }
  }, delay);
};

read();
