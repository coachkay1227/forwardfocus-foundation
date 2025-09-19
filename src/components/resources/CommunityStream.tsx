type Resource = {
  id: string;
  name: string;
  organization: string;
  city: string;
  verified: string;
  updated_at: string;
};

const CommunityStream = ({ resources }: { resources: Resource[] }) => {
  const recent = [...resources].sort((a,b)=> new Date(b.updated_at).getTime()-new Date(a.updated_at).getTime()).slice(0,5);
  const partnerAdds = resources.filter(r=>r.verified==='partner').slice(0,5);

  return (
    <section className="grid gap-4 md:grid-cols-3">
      <article className="rounded-lg border bg-card p-5">
        <h3 className="font-semibold">Recently Added by Partners</h3>
        <ul className="mt-3 space-y-2 text-sm">
          {partnerAdds.map(r=> (
            <li key={r.id} className="flex justify-between gap-2"><span>{r.name}</span><span className="text-muted-foreground">{new Date(r.updated_at).toLocaleDateString()}</span></li>
          ))}
        </ul>
      </article>
      <article className="rounded-lg border bg-card p-5">
        <h3 className="font-semibold">Community Updates</h3>
        <ul className="mt-3 space-y-2 text-sm">
          {recent.map(r=> (
            <li key={r.id} className="flex justify-between gap-2"><span>{r.organization}</span><span className="text-muted-foreground">{r.city}</span></li>
          ))}
        </ul>
      </article>
      <article className="rounded-lg border bg-card p-5">
        <h3 className="font-semibold">Success Stories</h3>
        <p className="mt-2 text-sm text-muted-foreground">Referral success stories coming soon. Want to share? Reach out via the Partner Portal.</p>
      </article>
    </section>
  );
};

export default CommunityStream;
