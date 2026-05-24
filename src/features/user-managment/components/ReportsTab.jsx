import { useNavigate } from 'react-router';
import { useAdminReports } from '@/features/admin/hooks/useAdmin';
import { getAdminListItems } from '@/features/admin/adminSanitize';
import { getReportStatusMeta } from '@/features/admin/mappers';
import { Card } from '@/components/ui/card';
import EmptyState from '@/components/EmptyState';
import TableSkeleton from '@/components/TableSkeleton';

function ReportsTab({ user }) {
  const navigate = useNavigate();
  const { data, isLoading } = useAdminReports({ page: 1, limit: 100 });

  const reports = getAdminListItems(data).filter(
    (r) =>
      r.reportedBy?.id === user?.id ||
      (r.targetType === 'user' && r.targetId === user?.id)
  );

  if (isLoading) return <TableSkeleton rows={4} columns={3} />;

  if (reports.length === 0) {
    return (
      <EmptyState
        title="No reports"
        description="No reports filed by or against this user."
      />
    );
  }

  return (
    <div className="space-y-4">
      {reports.map((report) => {
        const statusMeta = getReportStatusMeta(report.status);
        return (
          <Card
            key={report.id}
            className="cursor-pointer flex-row items-center justify-between p-4 hover:bg-muted/30"
            onClick={() => navigate(`/admin/reports/${report.id}`)}
          >
            <div>
              <p className="font-bold capitalize">{report.category || 'Report'}</p>
              <p className="text-muted-foreground line-clamp-1 text-xs">{report.description}</p>
            </div>
            <span className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase ${statusMeta.style}`}>
              {statusMeta.label}
            </span>
          </Card>
        );
      })}
    </div>
  );
}

export default ReportsTab;
