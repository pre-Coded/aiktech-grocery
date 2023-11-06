import get from "lodash/get";

export const storeToken = (token) => {
  localStorage.setItem("auth_token", token);
};

export const getToken = () => {
  let token = localStorage.getItem("auth_token");
  return token;
};

export const modifyCartData = (cartitem, product, action) => {
  const { id, category, title, image, price, description } = product;
  let modefiedCartItems = [...cartitem];
  let itemIndex = modefiedCartItems.findIndex((item) => {
    return item.id === id;
  });
  if (itemIndex >= 0) {
    let item = modefiedCartItems[itemIndex];
    if (action === "decrement") {
      if (item.quantity <= 1) {
        modefiedCartItems.splice(itemIndex, 1);
      } else {
        item["quantity"] = item["quantity"] - 1;
      }
    } else {
      item["quantity"] = item["quantity"] + 1;
    }
  } else {
    if (action !== "decrement") {
      modefiedCartItems.push({
        quantity: 1,
        id: id,
        product_name: title,
        original_price: price,
        photo: image,
        category: category,
        description: description,
      });
    }
  }
  return modefiedCartItems;
};

export const fetchQuantity = (id, items = []) => {
  let item = items.find((p) => {
    return p.id === id;
  });
  if (item) {
    return item.quantity;
  }
  return 0;
};

export const extractFinalPrice = (items) => {
  let final_price = 0;
  let final_item = 0;
  items.forEach((item) => {
    final_price += Number(item.original_price) * Number(item.quantity);
    final_item += Number(item.quantity);
  });
  return { final_price, final_item };
};

export const sortItems = (items) => {
  const formattedItems = items.sort(compare);
  return formattedItems;
};

const compare = (a, b) => {
  if (a.id < b.id) {
    return -1;
  }
  if (a.id > b.id) {
    return 1;
  }
  return 0;
};

export const errorMsg = (error) => {
  if (error && error["response"]) {
    const msg =
      get(error, "response.data.msg", "") ||
      get(error, "response.data.message", "");
    return msg;
  }
  return "Something went wrong!";
};

export const findFavouriteItem = (id, products) => {
  let item = products.find((element) => {
    const product_id = get(element, "product_id.id");
    return id === product_id;
  });
  if (item) {
    return true;
  }
  return false;
};

export const formatCategory = (categories) => {
  return categories && categories.length > 0 ? categories.slice(0, 5) : [];
};

export const dateExtractor = (value, type) => {
  let ans;
  let temp;
  let time;
  if (type === "24h") {
    ans = value.slice(11, 19);
    temp = value.slice(11, 13);
    temp = parseInt(temp);
    if (temp > 12) {
      temp = temp - 12;
      time = "pm";
    } else if (temp == 0) {
      temp = 12;
      time = "am";
    } else {
      time = "am";
    }
    temp =
      temp +
      value.slice(13, 16) +
      " " +
      time +
      ", " +
      value.slice(5, 7) +
      "/" +
      value.slice(8, 10) +
      "/" +
      value.slice(0, 4);
    ans = temp;
  } else
    ans =
      value.slice(5, 7) +
      "/" +
      value.slice(8, 10) +
      "/" +
      value.slice(0, 4) +
      " " +
      value.slice(11, 19);
  return ans;
};

export const pollingWithURL = (url, callback, timeInterval = 5000) => {
  let interval = setInterval(() => {
    callback(url);
  }, timeInterval);
  return interval;
};

export const polling = (callback, timeInterval = 5000, stop = false) => {
  let interval = setInterval(() => {
    callback();
  }, timeInterval);
  if (stop) {
    clearInterval(interval);
    console.log("stop");
  }

  return interval;
};

export const stepHandler = () => {
  let hideStep = localStorage.getItem("hideStep");
  return hideStep && hideStep === "true" ? true : false;
};

export const welcomeModalHandler = () => {
  let hidePopup = localStorage.getItem("hideWelcomePopup");
  return hidePopup && hidePopup === "true" ? true : false;
};

export const formatOptions = (options = [], key, val, act) => {
  let formattedOptions = [];
  formattedOptions = options.map((element) => {
    let name = get(element, key, "");
    let value = get(element, val, "");
    let active = get(element, act, "");
    return {
      label: name,
      value: value,
      active: active
    };
  });
  return formattedOptions;
};

export const findLabel = (options = [], value) => {
  let option = options.find((element) => {
    return element.value === value;
  });
  return option ? option.label : "";
};

export const formatName = (name) => {
  let formattedName = "";
  if (name) {
    let nameString = name.split(" ");
    if (nameString && nameString.length > 0) {
      formattedName = nameString[0];
    }
  }
  return formattedName ? formattedName : "User";
};

export function isNewLine(str, char = "\n") {
  return str.indexOf(char) > -1;
}
export const removeNewLine = (str) => {
  return str.replace("\n", "");
};
