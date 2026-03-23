/**
 * Consistent page header with title, description, and action slot.
 *
 * @param {object} props
 * @param {string} props.title - Page title
 * @param {string} [props.description] - Subtitle/description
 * @param {React.ReactNode} [props.children] - Action buttons or widgets
 */
function PageHeader({ title, description, children }) {
    return (
        <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
                <h2 className="text-3xl font-extrabold tracking-tight">{title}</h2>
                {description && (
                    <p className="text-muted-foreground mt-1">{description}</p>
                )}
            </div>
            {children && <div className="flex items-center gap-3">{children}</div>}
        </div>
    );
}

export default PageHeader;
