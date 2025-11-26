import { Link, useLocation } from "react-router-dom";
import { useMemo } from "react";
// import labelMap from "../routes/labelMap";
import { capitalize } from "../../utils/helper";

export default function Breadcrumbs() {
  const location = useLocation();


  // Split URL into usable segments
  const pathSegments = useMemo(() => {
    const segments = location.pathname.split("/").filter(Boolean);
    return segments.map((segment, index) => {
      const path = "/" + segments.slice(0, index + 1).join("/");
      return { segment, path };
    });
  }, [location.pathname]);

  // Convert segments into display labels
  const breadcrumbs = useMemo(() => {
    return pathSegments.map((item) => {
      //   const custom = labelMap[item.path];

      // If dynamic path e.g. /users/:id
      //   if (!custom && !isNaN(Number(item.segment))) {
      //     return {
      //       ...item,
      //       label: `#${item.segment}`, // fallback for numbers
      //     };
      //   }

      return {
        ...item,
        label: capitalize(item.segment.replace(/-/g, " ")),
      };
    });
  }, [pathSegments]);

  return (
    <nav aria-label="breadcrumb" className="mb-2">
      <ol className="flex list-none gap-1">
        <li className="font-semibold text-blue-800 hover:underline">
          <Link to="/">Home</Link>
        </li>

        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.path}>
            <span> {">"} </span>
            {index === breadcrumbs.length - 1 ? (
              <span>{crumb.label}</span>
            ) : (
              <Link
                to={crumb.path}
                className="font-semibold text-blue-800 hover:underline"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
