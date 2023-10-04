import CustomTable from 'components/Table/Table';
import { ActionElementModel } from 'models/Table.model';
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { getProductColumns } from 'utils/constant/table/columns';
import { confirm } from 'utils/helpers/dialog';
import { PagingData, pagingEvent } from '../../models/Pagination.model';
import { ProductModel } from '../../models/Product.model';
import { deleteProduct, getProducts } from "../../service/products.service";
import { initialPagingData, initialPagingEvent } from '../../utils/constant/models/pagination';
import LoadingOverlay from 'layout/loading-overlay/LoadingOverlay';

function Products(props: PropsWithChildren) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [products, setProducts] = useState<PagingData<ProductModel>>(initialPagingData);
  const [paging, setPaging] = useState(initialPagingEvent);
  const { page, limit } = paging;

  const loadData = useCallback((keyword?: string) => {
    setLoading(true);
    getProducts(page, keyword, limit).then((r) => {
      setProducts(r);
      setLoading(false);
    });
  }, [paging]);

  useEffect(() => {
    loadData();
  }, [paging, loadData]);

  async function deteleHandler(id: string) {
    const isConfirm = await confirm();
    if (!isConfirm || !id) return;

    setLoading(true);
    deleteProduct(id).then((r) => {
      if (r) {
        toast.success("Deleted product successfully!");
        if (page > 1) {
          setPaging({ page: 1, limit: paging.limit });
        } else {
          loadData();
        }
      }
      setLoading(false);
    });
  }

  function onPagingChange(e: pagingEvent) {
    setPaging(e);
  };

  const actionEls: ActionElementModel<ProductModel>[] = [
    {
      label: 'Edit',
      onclick: function (item) {
        navigate(`/product/${item._id}?action=edit`);
      }
    },
    {
      label: 'Delete',
      onclick: function (item) {
        deteleHandler(item._id);
      }
    },
  ];

  const productColumns = getProductColumns(actionEls);

  return (
    <LoadingOverlay loading={loading}>
      <CustomTable columns={productColumns} tableData={products} onPagingChange={onPagingChange} />
    </LoadingOverlay>
  );
}

export default Products;
