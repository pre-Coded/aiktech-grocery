import React, { useState } from "react";
import axios from "axios";
import { post_unit } from "../../api/request.api";
import "./form.css";
function AddUnitForm({ setShowModal, getStock}) {
  const [item, setItem] = useState({
    unit: "",
    unit_description: "",
  });
  const handleAddItem = (e) =>
    setItem({ ...item, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (item.unit !== "") {
      document.getElementById("loader-up").classList.toggle("loader-show");
      let data = {
        unit: item.unit,
        unit_description: item.unit_description,

      };
      axios({
        url: `${post_unit}`,
        method: "POST",
        data: data,
      })
        .then((res) => {
          console.log(res);
          if (res.data.status === 201) {
            document.getElementById("form").reset();

            setTimeout(() => {
              document
                .getElementById("loader-up")
                .classList.toggle("loader-show");

                getStock()
              setShowModal(false);
            }, 2000);
            // setLoading(false)
          } else if (res.data.status === 400) {
            // setLoading(false);
            setTimeout(() => {
              document
                .getElementById("loader-up")
                .classList.toggle("loader-show");
            }, 2000);
            alert("Please fill values correctly!");
          }
        })
        .catch((error) => {
          // setLoading(false)
          setTimeout(() => {
            document
              .getElementById("loader-up")
              .classList.toggle("loader-show");
          }, 2000);
          console.log("NETWORK ERROR!");
          alert("Network Error");
        });
    } else {
      alert("Please enter values");
    }
  };
  return (
    <div>

        <div className="row">
          <div className="col-lg-8 col-md-8 col-sm-8 col-12">
            <input
              type="text"
              className="input mt-2"
              name="unit"
              id="unit"
              placeholder="Enter Unit"
              value={item.unit}
              onChange={handleAddItem}
            />
            <input
              type="text"
              className="input mt-2"
              name="unit_description"
              id="unit_description"
              placeholder="unit_description"
              value={item.unit_description}
              onChange={handleAddItem}
            />
          </div>
      </div>
      <div className="btn-container">
        <div className="mt-3 text-center">
          <button
            className="btn btn-light px-2 submit_button"
            onClick={handleSubmit}
          >
            Submit Unit
          </button>
        </div>
        <div className="mt-3 text-center">
          <button
            className="btn btn-outline-light px-2 submit_button"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddUnitForm;