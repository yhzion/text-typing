import { Configuration } from "./Configuration";

const useTextTyping = (
  domElement: HTMLElement,
  configuration: Configuration
) => {
  const $text: HTMLElement = document.createElement("span");
  const $cursor: HTMLElement = document.createElement("span");
  $cursor.setAttribute(
    "style",
    `
    display: inline-block;
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    background: rgba(0,0,0,0.5);
    animation-name: circle;
    animation-duration: .3s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-direction: alternate;
    margin-left: 0.25rem;
  `
  );

  domElement.appendChild($text);
  domElement.appendChild($cursor);

  const preloadTextArray = configuration.preloadTextArray;
  preloadTextArray.forEach((text) => {
    $text.innerHTML += text;
  });

  const delay = configuration.delay || 5;

  const setVisibleCursor = (visible: boolean) => {
    $cursor.style.display = visible ? "inline-block" : "none";
  };

  let isTyping = false;

  const setTyping = (_isTyping: boolean) => {
    isTyping = _isTyping;
  };
  const textQueue: string[] = [];
  const push = (text: string, hasNext = true) => {
    textQueue.push(text);
    if (isTyping) {
      return;
    }
    setTyping(true);
    let textArray: string[] = [];
    if (textQueue.length > 1) {
      textArray = [textQueue.shift()!];
    } else if (textQueue.length === 1) {
      textArray = [...textQueue.shift()!];
    }
    for (let i = 0; i < textArray.length; i++) {
      setTimeout(() => {
        $text.innerHTML += textArray[i];
        if (i === textArray.length - 1) {
          setTyping(false);
          if (textQueue.length > 0) {
            const nextText = textQueue.shift()!;
            push(nextText, hasNext);
          }
        }
        setVisibleCursor(hasNext);
      }, delay * i);
    }
  };

  const stop = () => {
    setVisibleCursor(false);
  };

  return {
    push,
    stop,
  };
};

export { useTextTyping };
