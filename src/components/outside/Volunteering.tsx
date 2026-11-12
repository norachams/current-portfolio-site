import { volunteerKinds, volunteering } from "@/data/outside";
import EntryCard, { ColumnLabel } from "./EntryCard";

export default function Volunteering() {
  return (
    <section aria-label="Volunteering" className="grid grid-cols-1 items-start gap-x-(--gap-card) gap-y-10 md:grid-cols-3">
      {volunteerKinds.map(({ kind, label, pastel }) => (
        <div key={kind} className="flex flex-col gap-(--gap-card)">
          <ColumnLabel pastel={pastel}>{label}</ColumnLabel>
          {volunteering
            .filter((vol) => vol.kind === kind)
            .map((vol, i) => (
              <EntryCard key={i} title={vol.org} dates={vol.dates} chip={vol.role} pastel={vol.pastel} note={vol.note} url={vol.url} />
            ))}
        </div>
      ))}
    </section>
  );
}
