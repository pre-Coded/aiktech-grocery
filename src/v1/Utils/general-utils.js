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


export const formatOptions = (options = [], key, val, act, lat, long, delivery_distance) => {
  let formattedOptions = [];
  formattedOptions = options.map((element) => {
    let name = get(element, key, "");
    let value = get(element, val, "");
    let active = get(element, act, "");
    let latitude = get(element, lat, "");
    let longitude = get(element, long, "");
    let deliverable_distance = get(element, delivery_distance, "")
    return {
      label: name,
      value: value,
      active: active,
      latitude: latitude,
      longitude: longitude,
      deliverable_distance: deliverable_distance
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

export const coordinateDistanceFinder=(lat1, lon1, lat2, lon2)=>{

  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }
    const earthRadius = 6371; 
  
    const lat1Rad = toRadians(lat1);
    const lon1Rad = toRadians(lon1);
    const lat2Rad = toRadians(lat2);
    const lon2Rad = toRadians(lon2);
  
    const latDiff = lat2Rad - lat1Rad;
    const lonDiff = lon2Rad - lon1Rad;
  
    const a =
      Math.sin(latDiff / 2) ** 2 +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(lonDiff / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = earthRadius * c;
  
    return distance; 
}
export  function getCoordinates(string){
  const lat_start = string.indexOf("lat");
  const lat_end = string.indexOf("long");
  const long_end = string.indexOf("link")
  try{
    const latitude = parseFloat(string.substring(lat_start+5,lat_end-2));
  const longitude = parseFloat(string.substring(lat_end+6,long_end-2));
  return [latitude,longitude]

  }
  catch(err){
    console.error(err.message)
    return null
  }
  
}

export const getNearestInventory =  (inventoryList, latitude, longitude)=>{
  
  let distances_list = [];
  let inventories = [];

for(let i=0;i<inventoryList.length;i++){

    const distance = 1000*coordinateDistanceFinder(latitude,longitude,parseFloat(inventoryList[i].latitude),parseFloat(inventoryList[i].longitude));
    if(distance<inventoryList[i].deliverable_distance){
      distances_list.push(distance);
      inventories.push(inventoryList[i].value)
    }
  }

  if(distances_list.length !==0 && inventories.length !== 0){
  const min = Math.min(...distances_list);
  const index = distances_list.indexOf(min);
  const inventory = inventories[index];

  return inventory;
  
  }
else{

  return null;

}
}
