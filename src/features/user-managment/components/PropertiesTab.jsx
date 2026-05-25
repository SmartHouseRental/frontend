import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Bed, Bath, Eye, Home, MapPin } from 'lucide-react';
import { useAdminProperties } from '@/features/admin/hooks/useAdmin';
import { getAdminListItems } from '@/features/admin/adminSanitize';
import {
  formatLocalizedText,
  formatPropertyCategory,
  formatPropertyPrice,
  getPropertyStatusMeta,
} from '@/features/admin/mappers';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import EmptyState from '@/components/EmptyState';
import TableSkeleton from '@/components/TableSkeleton';

function PropertiesTab({ user }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const searchTerm = user?.first_name || user?.email || '';
  const { data, isLoading } = useAdminProperties({
    page: 1,
    limit: 100,
    ...(searchTerm ? { search: searchTerm } : {}),
  });

  const allItems = getAdminListItems(data);
  const properties = allItems.filter((p) => p.owner?.id === user?.id || p.ownerId === user?.id);

  if (isLoading) return <TableSkeleton rows={4} columns={3} />;

  if (properties.length === 0) {
    return (
      <EmptyState
        title={t('adminUserDetail.properties.emptyTitle')}
        description={t('adminUserDetail.properties.emptyDescription')}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {properties.map((property) => {
        const statusMeta = getPropertyStatusMeta(property.status);
        const title = formatLocalizedText(property.title, t('adminUserDetail.properties.untitled'));
        const address = formatLocalizedText(
          property.address || property.location,
          t('adminUserDetail.properties.noAddress')
        );
        const price = formatPropertyPrice(property.price, '—');
        const category = property.categoryType || formatPropertyCategory(property.category);
        const image = property.images?.[0];

        return (
          <Card
            key={property.id}
            className="group cursor-pointer overflow-hidden border-border/60 transition-all hover:border-primary/30 hover:shadow-lg"
            onClick={() => navigate(`/admin/properties/${property.id}`)}
          >
            <div className="relative h-40 overflow-hidden bg-muted">
              {image ? (
                <img
                  src={image}
                  alt={title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground/40">
                  <Home size={40} strokeWidth={1.25} />
                </div>
              )}
              <Badge
                className={`absolute top-3 right-3 text-[10px] font-bold uppercase shadow-sm ${statusMeta.style}`}
              >
                {statusMeta.label}
              </Badge>
            </div>

            <CardContent className="space-y-3 p-4">
              <div>
                <p className="line-clamp-1 text-base font-bold">{title}</p>
                <p className="text-muted-foreground mt-1 flex items-start gap-1.5 text-xs">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span className="line-clamp-2">{address}</span>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="text-[10px] font-semibold">
                  {category}
                </Badge>
                {(property.bedrooms != null || property.bathrooms != null) && (
                  <div className="text-muted-foreground flex items-center gap-3 text-xs">
                    {property.bedrooms != null && (
                      <span className="flex items-center gap-1">
                        <Bed size={14} /> {property.bedrooms}
                      </span>
                    )}
                    {property.bathrooms != null && (
                      <span className="flex items-center gap-1">
                        <Bath size={14} /> {property.bathrooms}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="border-border/60 flex items-center justify-between border-t pt-3">
                <div>
                  <p className="text-muted-foreground text-[10px] font-semibold uppercase tracking-wider">
                    {t('adminUserDetail.properties.monthlyRent')}
                  </p>
                  <p className="text-primary text-lg font-extrabold">{price}</p>
                </div>
                <div className="text-muted-foreground flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1">
                    <Eye size={14} />
                    {property.viewCount ?? 0}
                  </span>
                  <span className="rounded bg-muted px-1.5 py-0.5 font-bold">
                    {t('adminUserDetail.properties.edits', { current: property.editCount ?? 0, total: 1 })}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default PropertiesTab;
