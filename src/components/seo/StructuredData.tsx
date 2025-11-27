import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  data: Record<string, any>;
}

export const StructuredData = ({ data }: StructuredDataProps) => {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(data)}
      </script>
    </Helmet>
  );
};
