const messagesList = {
  currentPage: "current_page",
  closeBrowser: "close_browser",
};

function publishSubscribe() {
  const handlers = {};

  // Добавление данных в ответ на событие
  function publish(msgName: string, data: any) {
    if (!handlers[msgName]) {
      return;
    }

    handlers[msgName].forEach((handler) => {
      handler(data);
    });
  }

  // Функция подписки на событие/уведомление
  function subscribe(msgName: string, handler: Function) {
    if (!handlers[msgName]) {
      handlers[msgName] = [];
    }

    handlers[msgName].push(handler);
  }

  return {
    publish,
    subscribe,
  };
}

const publishsubscribe = publishSubscribe();

export { publishsubscribe, messagesList };
