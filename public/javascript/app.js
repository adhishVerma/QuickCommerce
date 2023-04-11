$('button[type="add-cart"]').on("click", function (e) {
  const productId = $(this).data("id");
  $.ajax({
    url: "/order/cart",
    method: "POST",
    data: {
      productId,
    },
  })
    .then(function () {
      console.log("call made");
    })
    .catch(function () {
      console.log("call failed");
    });
});

$(".search-results").on("click", "button", function () {
  const productId = $(this).data("id");
  $.ajax({
    url: "/order/cart",
    method: "POST",
    data: {
      productId,
    },
  })
    .then(function () {
      console.log("call made");
    })
    .catch(function () {
      console.log("call failed");
    });
});

$('button[type="remove-cart"]').on("click", function (e) {
  const productId = $(this).data("id");
  $.ajax({
    url: "/order/cart",
    method: "DELETE",
    data: {
      productId,
    },
  })
    .then(function () {
      console.log("deleted");
    })
    .catch(function () {
      console.log("call failed");
    });
});

$('button[type="qty"]').on("click", function () {
  const buttonId = $(this).data("id");
  const productId = buttonId.slice(1);
  const input = $(`input[id=${productId}]`);
  if (buttonId.startsWith('p')){
      input.val(Number(input.val())+1)
  }else if(buttonId.startsWith('m')){
    if(input.val() < 2){

    }else{
        input.val(Number(input.val())-1)
    }
  }
});

const productTemplate = (name, id, price, photo) => {
  const productContainer = $("<div>").attr({
    class: "col p-2",
    id: id,
  });

  const cardContainer = $("<div>").attr({
    class: "card p-2",
  });

  const imgContainer = $("<div>").attr({
    class: "mb-2 ratio ratio-1x1",
  });
  const img = $("<img>").attr({
    src: photo,
    alt: "product-image",
    class: "z-1 img-fluid object-fit-cover",
  });
  const nameDiv = $("<div>").attr({
    class: "text-nowrap overflow-hidden",
  });
  const priceDiv = $("<div>").attr({
    class: "fw-semibold fs-5 mb-2",
  });
  const button = $("<button>").attr({
    "data-id": id,
    class: "btn btn-primary",
    type: "add-cart",
  });

  nameDiv.append(name);
  priceDiv.append("<span>&#8377;</span>");
  priceDiv.append(price);
  imgContainer.append(img);
  button.html("Add to cart");
  cardContainer.append(imgContainer, nameDiv, priceDiv, button);
  productContainer.append(cardContainer);
  return productContainer;
};

const searchResult = (result) => {
  const name = result.name;
  const id = result._id;
  const price = result.price;
  const photo = result.photoURL;

  const newProduct = productTemplate(name, id, price, photo);
  $(".search-results").append(newProduct);
};

$('button[type="search"]').on("click", function () {
  let searchText = $("#search").val();
  $(".search-results").html("");
  $.ajax({
    url: "/search",
    method: "POST",
    data: {
      searchText,
    },
  })
    .then((res) => {
      res.forEach((result) => {
        searchResult(result);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
