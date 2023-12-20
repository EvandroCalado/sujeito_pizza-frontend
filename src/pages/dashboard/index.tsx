import { canSSRAuth } from '@/utils/canSSRAuth';

export type DashboardProps = {
  title?: string;
};

export default function Dashboard({ title = 'Dashboard' }: DashboardProps) {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}

export const getServerSideProps = canSSRAuth(async () => {
  return {
    props: {},
  };
});
