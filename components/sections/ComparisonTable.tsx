type Row = {
  label: string;
  cells: string[];
};

type ComparisonTableProps = {
  title?: string;
  caption: string;
  columns: string[];
  rows: Row[];
};

export function ComparisonTable({ title, caption, columns, rows }: ComparisonTableProps) {
  return (
    <figure className="card-surface overflow-hidden rounded-2xl shadow-sm transition duration-300">
      {title ? (
        <figcaption className="border-b border-[var(--border)] px-4 py-3 text-sm font-semibold text-[var(--heading)] sm:px-6">
          {title}
        </figcaption>
      ) : null}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[var(--surface-muted)] text-[var(--heading)]">
            <tr>
              <th scope="col" className="whitespace-nowrap px-4 py-3 font-semibold sm:px-6">
                Dimension
              </th>
              {columns.map((c) => (
                <th
                  key={c}
                  scope="col"
                  className="whitespace-nowrap px-4 py-3 font-semibold sm:px-6"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)] text-[var(--text-muted)]">
            {rows.map((row) => (
              <tr key={row.label} className="align-top">
                <th
                  scope="row"
                  className="px-4 py-3 font-medium text-[var(--text)] sm:px-6"
                >
                  {row.label}
                </th>
                {row.cells.map((cell, i) => (
                  <td key={`${row.label}-${i}`} className="px-4 py-3 sm:px-6">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="border-t border-[var(--border)] px-4 py-3 text-xs leading-relaxed text-[var(--text-muted)] sm:px-6">
        {caption}
      </figcaption>
    </figure>
  );
}
