import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import ImageInput from 'components/FormInput/Image/ImageInput';
import { ProductModel } from 'models/Product.model';
import { FileUpload } from 'primereact/fileupload';
import { ChangeEvent, FormEvent, Fragment, useEffect, useReducer, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUpdateEffect } from 'react-use';
import { uploadFiles } from 'service/files.service';
import { createProduct, getProduct, updateProduct } from 'service/products.service';
import { CATEGORIES } from 'utils/constant/Category';
import { initialProduct } from 'utils/constant/models/products';

export default function NewProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const imageInputRef = useRef<FileUpload>();

  const [product, setProduct] = useReducer((p: ProductModel, update: ProductModel) => {
    return update;
  }, initialProduct);

  useEffect(() => {
    if (id) {
      getProduct(id)
        .then(p => {
          setProduct(p);
        });
    } else {
      setProduct(initialProduct);
    }
  }, [id]);

  function changeProductHandler(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (name === 'price' || name === 'quantity') {
      if (+value < 1) {
        setProduct({
          ...product,
          [name]: 1
        });
        return;
      }
    }
    setProduct({
      ...product,
      [name]: value
    });
  }

  async function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const title = form.get('title') as string;
    const category = form.get('category') as string;
    const price = form.get('price') as string;
    const quantity = +form.get('quantity');
    const description = form.get('description') as string;
    const longDescription = form.get('longDescription') as string;
    const files = imageInputRef.current.getFiles();
    const product: ProductModel = {
      _id: id,
      title,
      category,
      price,
      quantity,
      description,
      longDescription,
    };
    // console.log('product ', product);
    // console.log('files ', files);

    if (!files.length && !id) {
      toast.warn('Please select image file!');
      return;
    }

    if (id) {
      const processUpdateProduct = () => {
        updateProduct(product).then((productId) => {
          if (productId) {
            navigate("/products");
            toast.success('Updated product successfully!');
          }
        });
      };
      if (files?.length) {
        const fileIds = await uploadFiles(files);
        if (fileIds) {
          if (fileIds.length) {
            product.fileIds = fileIds;
          }
          processUpdateProduct();
        }
      } else {
        processUpdateProduct();
      }
    } else {
      const fileIds = await uploadFiles(files);
      console.log('fileIds ', fileIds);
      if (fileIds) {
        if (fileIds.length) {
          product.fileIds = fileIds;
        }
        createProduct(product).then((productId) => {
          if (productId) {
            navigate("/products");
            toast.success('Created product successfully!');
          }
        });
      }
    }
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="elevation" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} component='form' onSubmit={save}>
        {/* <Typography component="h1" variant="h4" align="center">
          Product
        </Typography> */}
        <Fragment>
          {/* <Typography variant="h6" gutterBottom>
            Shipping address
          </Typography> */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="title"
                label="Product name"
                fullWidth
                autoComplete="Product name"
                variant="standard"
                onChange={changeProductHandler}
                value={product.title}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="standard" sx={{ minWidth: 120, width: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
                <Select
                  name="category"
                  labelId="label"
                  required
                  onChange={changeProductHandler}
                  value={product.category}
                >
                  {
                    CATEGORIES.map(c => (
                      <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="price"
                label="Price"
                fullWidth
                autoComplete="2351"
                variant="standard"
                type='number'
                onChange={changeProductHandler}
                value={product.price}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="quantity"
                label="Quantity"
                fullWidth
                autoComplete="999"
                variant="standard"
                type='number'
                onChange={changeProductHandler}
                value={product.quantity?.toString() + ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name="description"
                label="Short description"
                fullWidth
                autoComplete="Short description"
                variant="standard"
                onChange={changeProductHandler}
                value={product.description}
                multiline
                minRows='2'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name="longDescription"
                label="Long description"
                fullWidth
                autoComplete="Long description"
                variant="standard"
                onChange={changeProductHandler}
                value={product.longDescription}
                multiline
                minRows='3'
              />
            </Grid>
            <Grid item xs={12}>
              <ImageInput ref={imageInputRef} fileIds={product.fileIds || []} />
            </Grid>
          </Grid>
        </Fragment>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            sx={{ mt: 3, ml: 1 }}
            type='submit'
          >
            Save
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}