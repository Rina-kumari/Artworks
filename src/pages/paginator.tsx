import { Paginator } from 'primereact/paginator';
import { Ripple } from 'primereact/ripple';
import { classNames } from 'primereact/utils';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { setPage, setRows } from '../store/actions/paginatorAction';
import type { PaginatorPrevPageLinkOptions, PaginatorNextPageLinkOptions, PaginatorPageLinksOptions } from 'primereact/paginator';

function PaginatorComponent() {

  const dispatch = useDispatch<AppDispatch>();
  
  const { currentPage_offset, rows_per_page_limit, total_artworks, current_Page } = useSelector(
    (state: RootState) => state.paginator
  );

  const template = {
    layout: 'PrevPageLink PageLinks NextPageLink',
    PrevPageLink: (options: PaginatorPrevPageLinkOptions) => (
      <button
        type="button"
        className={classNames(options.className)}
        onClick={options.onClick}
        disabled={options.disabled}
        style={{ 
          borderRadius: '4px', 
          border: '1px solid #adb5bd', 
          backgroundColor: 'white',
          width: '80px',
          height: '32px',
          color: 'black',
        }}
      >
        <span>Previous</span>
        <Ripple />
      </button>
    ),
    NextPageLink: (options: PaginatorNextPageLinkOptions) => (
      <button
        type="button"
        className={classNames(options.className)}
        onClick={options.onClick}
        disabled={options.disabled}
        style={{ borderRadius: '4px', border: '1px solid #adb5bd', backgroundColor: 'white', width: '65px', height: '32px', color: 'black', }}
      >
        <span>Next</span>
        <Ripple />
      </button>
    ),
    PageLinks: (options: PaginatorPageLinksOptions) => {
      const isCurrentPage = options.page + 1 === current_Page; 
      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
          style={{
            borderRadius: '4px',
            border: '1px solid #adb5bd',
            backgroundColor: isCurrentPage ? 'var(--primary-color)' : 'white',
            color: isCurrentPage ? 'white' : 'black',
            height: '32px', width: '32px', minWidth: 'unset', padding: '0', 
          }}
        >
          {options.page + 1}
          <Ripple />
        </button>
      );
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '0',
      backgroundColor: 'var(--surface-b)',
      padding: '0.5rem 0',
      border: '1px solid var(--surface-d)'
    }}>

  
      <span style={{ color: 'var(--text-color)', userSelect: 'none', marginLeft: '1rem' }}>
        Showing <strong>{(current_Page - 1) * rows_per_page_limit + 1}</strong> to <strong>{Math.min(current_Page * rows_per_page_limit, total_artworks)}</strong> of <strong>{total_artworks}</strong> entries
      </span>

      <Paginator
        template={template}
        first={currentPage_offset}        
        rows={rows_per_page_limit}        
        totalRecords={total_artworks}     
        pageLinkSize={5}
        onPageChange={(e) => {
          dispatch(setPage(e.first));
          dispatch(setRows(e.rows));
        }}
        style={{ background: 'transparent', border: 'none' }}
      />

    </div>
  );
}

export default PaginatorComponent;