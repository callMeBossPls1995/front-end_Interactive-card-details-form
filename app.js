window.onload = () => {
  const cardForm = document.querySelector("#card-form");
  const card = {
    cardName: { value: "" },
    cardNumber: { value: "" },
    cvcNumber: { value: "" },
    expiredDay: { month: { value: "" }, year: { value: "" } },
  };

  const cardNameInput = document.querySelector("#cardName");
  const cardNumberInput = document.querySelector("#cardNumber");
  const monthInput = document.querySelector("#month");
  const yearInput = document.querySelector("#year");
  const cvcSpan = document.querySelector("#cvcNumber");

  // event listeners
  cardForm.addEventListener("submit", formSubmit);

  cvcSpan.addEventListener("input", function (event) {
    const input = event.currentTarget;
    const cvcNumber = document.querySelector("#cvc");

    console.log(cvcNumber);

    if (input.value.length > 3) return;

    cvcNumber.innerHTML = `${input.value}`;
  });

  cardNameInput.addEventListener("input", function (event) {
    const input = event.currentTarget;

    const cardNameLabel = document.querySelector("#name");
    cardNameLabel.innerHTML = `${input.value}`;
  });

  monthInput.addEventListener("input", function (event) {
    const input = event.currentTarget.value;

    if (input.length < 3)
      document.querySelector("#month-card").innerHTML = `${input}`;
  });

  yearInput.addEventListener("input", function (event) {
    const input = event.currentTarget.value;
    if (input.length < 3)
      document.querySelector("#year-card").innerHTML = `${input}`;
  });

  cardNumberInput.addEventListener("input", function (event) {
    const input = event.currentTarget;

    if (cardNumberInput.value.length < 20) {
      var tempArray = [];
      tempArray = Array.from(input.value);

      for (let i = 0; i < input.value.length; i++) {
        if ((i + 1) % 5 === 0 && i != 0) {
          if (tempArray[i] == " ") {
            continue;
          } else {
            console.log("slicing", i);
            tempArray.splice(i, 0, " ");
          }
        }
      }

      cardNumberInput.value = `${tempArray.join("")}`;

      for (let j = 0; j < 100; j++) {
        // if (j % 4 === 0) console.log(j);
      }

      const cardNumberP = document.querySelector("#card-number");
      cardNumberP.innerHTML = `${tempArray.join("")}`;
    }
  });

  //   functions
  function formSubmit(event) {
    event.preventDefault();

    const { currentTarget } = event;
    card.cardName.value = currentTarget.cardName.value;
    card.cardNumber.value = currentTarget.cardNumber.value;
    card.expiredDay.month.value = currentTarget.month.value;
    card.expiredDay.year.value = currentTarget.year.value;
    card.cvcNumber.value = currentTarget.cvcNumber.value;

    for (const property in card) {
      if (property === "expiredDay") {
        validateEmptyInput(property, card[property].month, (type = "month"));
        validateEmptyInput(property, card[property].year, (type = "year"));
      }
      validateEmptyInput(property, card[property]);

      if (property === "cardNumber") {
        card["cardNumber"].error = checkInputLengthAndFormat(
          (min = 3),
          (max = 20),
          card["cardNumber"].value
        );
      }
    }

    displayInputErrors();

    console.log(card);

    function checkInputLengthAndFormat(min = 1, max = 20, value) {
      const stringValue = value;

      console.log(stringValue);
      if (stringValue.length <= min)
        return `Field number cannot be less than ${min} numbers`;
      if (stringValue.length >= max) {
        return `Field number cannot be exceed ${max} numbers`;
      }

      if (!/^\d+$/.test(stringValue)) return "Wrong format, numbers only";

      return "";
    }
  }

  function validateEmptyInput(name, value, type = "") {
    const tempvalue = value.value;

    if (tempvalue === "") {
      if (name === "expiredDay") {
        if (type === "month") card[name].month.error = "Can't be blank";
        if (type === "year") card[name].year.error = "Can't be blank";
      } else card[name].error = "Field is empty";
    } else {
      if (type === "month") card[name].month.error = "";
      if (type === "year") card[name].year.error = "";

      card[name].error = "";
    }
  }

  function displayInputErrors() {
    for (let property in card) {
      if (property === "expiredDay") {
        const span = document.querySelector(".double > div > span");

        const input1 = span.previousElementSibling;
        const input2 = span.previousElementSibling.previousElementSibling;

        if (card["expiredDay"].month.error) {
          setError(input2);
        }

        if (card["expiredDay"].year.error) {
          setError(input1);
        }

        span.innerHTML = `${
          card["expiredDay"].month.error || card["expiredDay"].year.error
        }`;

        if (
          card["expiredDay"].month.error === "" &&
          card["expiredDay"].year.error === ""
        ) {
          removeError(input1);
          removeError(input2);
        }

        continue;
      }
      const span = document.querySelector(`#${property} + span`);
      const input = span.previousElementSibling;

      if (card[property].error) {
        setError(input);
        span.innerHTML = `${card[property].error}`;
      } else {
        span.innerHTML = "";
        removeError(input);
      }
    }
  }

  function setError(input) {
    input.className = "error-input";
  }

  function removeError(input) {
    console.log(input);
    input.className = "";
  }
};
