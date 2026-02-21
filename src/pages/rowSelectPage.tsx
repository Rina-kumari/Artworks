import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import type { Artwork } from '../types/types';
import type { AppDispatch } from '../store/store';
import { fetchArtworksByCount } from '../store/actions/tableAction';

interface RowSelectorProps {
  artworks: Artwork[] | undefined;
  onSelect: (selected: Artwork[]) => void;
  allSelected: Artwork[];
}

function RowSelector({ onSelect }: RowSelectorProps) {
  const [value, setValue] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const op = useRef<OverlayPanel>(null);
  const dispatch = useDispatch<AppDispatch>();

  const handleSelect = async () => {
    if (!value || value < 1) return;
    setLoading(true);

    await dispatch(fetchArtworksByCount(value, (fetched) => {
      onSelect(fetched);
      op.current?.hide();
      setValue(null);
    }));

    setLoading(false);
  };

  return (
    <>
      <i
        className="pi pi-chevron-down"
        onClick={(e) => op.current?.toggle(e)}
        style={{ cursor: 'pointer', fontSize: '0.75rem' }}
      />

      <OverlayPanel ref={op} style={{ width: '340px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          <span style={{ fontWeight: '500', fontSize: '0.9rem' }}>Select Multiple Rows</span>
          <span style={{ fontSize: '0.78rem', color: '#6c757d' }}>
            Enter number of rows to select across all pages
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              display: 'flex', height: '32px', alignItems: 'center',
              border: '1px solid #ced4da', borderRadius: '4px',
              overflow: 'hidden', flex: 1
            }}>
              <input
                type="number"
                value={value ?? ''}
                onChange={(e) => setValue(Number(e.target.value))}
                placeholder="e.g. 20"
                min={0}
                style={{
                  border: 'none', outline: 'none', textAlign: 'left',
                  paddingLeft: '0.5rem', width: '100%', fontSize: '0.85rem'
                }}
              />
            </div>

            <Button
              label={loading ? "Loading..." : "Select"}
              size="small"
              disabled={!value || value < 1 || loading}
              onClick={handleSelect}
              style={{ padding: '0.4rem 1.5rem', fontSize: '0.75rem' }}
            />
          </div>

        
        </div>
      </OverlayPanel>
    </>
  );
}

export default RowSelector;