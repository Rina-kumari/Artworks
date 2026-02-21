import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { fetchArtworks } from '../store/actions/tableAction'; 
import type { Artwork } from '../types/types';
import PaginatorComponent from './paginator';
import RowSelector from './rowSelectPage';

function TablePage() {

  const dispatch = useDispatch<AppDispatch>();

  const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);

  const { loading, error, artworks } = useSelector((state: RootState) => state.table); 

  const { currentPage_offset, rows_per_page_limit } = useSelector((state: RootState) => state.paginator);

  useEffect(() => {
    const page = currentPage_offset / rows_per_page_limit + 1;
    dispatch(fetchArtworks(page)); 
  }, [dispatch, currentPage_offset, rows_per_page_limit]);

  const truncateBody = (value: string | null | undefined) => (
    <span style={{ display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
      {value ?? 'N/A'}
    </span>
  );

  return (
    <div className="card"  style={{ backgroundColor: 'var(--surface-b)' }}>
      
      <div className="flex justify-content-center align-items-center mb-8 gap-2">
        <span style={{ color: 'var(--text-color-secondary)', fontWeight: '500' }}>
          Selected: <span style={{ color: '#2196F3' }}>{selectedArtworks.length}</span> rows
        </span>
      </div>

      {error && (
        <p style={{ color: '#e53935', backgroundColor: '#ffebee', padding: '0.5rem 1rem', borderRadius: '4px', margin: '0 0 0.5rem 0' }}>
          Error: {error}
        </p>
      )}


        <>
          <DataTable
            
            size="small"
            stripedRows
            selectionMode="checkbox"
            selection={selectedArtworks}
            onSelectionChange={(e) => setSelectedArtworks(e.value)}
            dataKey="id"
            tableStyle={{ minWidth: '50rem' }}
            value={loading ? [] : artworks}
            emptyMessage={
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '400px', gap: '0.5rem' }}>
                <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }} />
                <span style={{ fontSize: '0.8rem', color: 'var(--text-color-secondary)' }}>Loading artworks...</span>
              </div>
            }
            pt={{
              thead: { style: { borderTop: '1px solid var(--surface-d)' } },
              column: {
                headerCell: { style: { fontWeight: '500' } }
              }
            }}
          >
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />

            <Column
              header={
                <RowSelector
                  artworks={artworks}
                  onSelect={setSelectedArtworks}
                  allSelected={selectedArtworks}
                />
              }
            />

            <Column field="title" header="TITLE"
              pt={{ bodyCell: { style: { fontWeight: 'bold' } } }}
            />
            <Column field="place_of_origin" header="PLACE OF ORIGIN" style={{ width: '10%' }} />
            <Column field="artist_display" header="ARTIST" style={{ maxWidth: '0', width: '20%' }} body={(rowData: Artwork) => truncateBody(rowData.artist_display)} />
            <Column field="inscriptions" header="INSCRIPTIONS" style={{ maxWidth: '0', width: '20%' }} body={(rowData: Artwork) => truncateBody(rowData.inscriptions)} />
            <Column field="date_start" header="START DATE" style={{ width: '5%' }} />
            <Column field="date_end" header="END DATE" style={{ width: '5%' }} />
          </DataTable>

     <PaginatorComponent />
        </>
    
    </div>
  );
}

export default TablePage;