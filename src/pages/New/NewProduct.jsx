import { useRef } from "react";
import { createProduct } from "../../service/products.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const navigate = useNavigate();
  const formInput = useRef();
  function submitHandler(e) {
    e.preventDefault();
    const formEl = formInput.current;
    for (let i = 0; i < formEl.length; i++) {
      const element = formEl[i];
      if (!element.value && element.name) {
        console.log("element.name", element.name);
        toast.warning("Please enter " + element.name);
        return;
      }
      if (element.name === "image" && element.files.length !== 4) {
        toast.warning("Please upload 4 images ");
        return;
      }
    }
    const {
      productName,
      price,
      quantity,
      category,
      description,
      longDescription,
      image,
    } = formEl;
    const formData = new FormData();
    // const data = new URLSearchParams(formData);
    formData.append("title", productName.value);
    formData.append("price", price.value);
    formData.append("quantity", quantity.value);
    formData.append("category", category.value);
    formData.append("description", description.value);
    formData.append("longDescription", longDescription.value);
    formData.append("image", image.files[0]);
    formData.append("image", image.files[1]);
    formData.append("image", image.files[2]);
    formData.append("image", image.files[3]);
    createProduct(formData).then((r) => {
      if (r) {
        console.log("r ", r);
        navigate("/products");
      }
    });
  }
  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <form
            ref={formInput}
            style={{ width: "50%", marginLeft: "40px" }}
            onSubmit={submitHandler}
          >
            <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Product Name"
                name="productName"
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                step={"0.001"}
                className="form-control"
                placeholder="Enter Price"
                name="price"
              />
            </div>
            <div className="form-group">
              <input
                type="hidden"
                className="form-control"
                placeholder="Enter quantity"
                name="quantity"
                value={999}
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Category"
                name="category"
              />
            </div>
            <div className="form-group">
              <label>Short Description</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Enter Short Description"
                name="description"
              ></textarea>
            </div>
            <div className="form-group">
              <label>description</label>
              <textarea
                className="form-control"
                rows="6"
                placeholder="Enter Long Description"
                name="longDescription"
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlFile1">
                Upload image (4 images)
              </label>
              <input
                type="file"
                className="form-control-file"
                id="exampleFormControlFile1"
                multiple
                name="image"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
