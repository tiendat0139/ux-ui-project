import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import Proptypes from "prop-types";
import {NavigateNext} from "@mui/icons-material";
import WorkspaceHeader from "./WorkspaceHeader";
import { useState } from "react";
import { useParams } from "react-router-dom";

const PageHeader = ({ title, pageType }) => {
  const { palette } = useTheme();
  const [pageTitle, setPageTitle] = useState(title);

  let {id} = useParams();

  return (
    <Box sx={{position: "fixed", top: 48, width: "100%"}}>
      <Breadcrumbs
        separator={
          <NavigateNext
            sx={{ color: alpha("#4A5974", 0.5), fontSize: 16 }}
          />
        }
        aria-label="breadcrumb"
      >
        <Link
          underline="hover"
          key="1"
          href={pageType === "workspace" ? "/workspace/1" : "/personal"}
          color={alpha(palette.text.light, 0.5)}
          sx={{ cursor: "pointer", fontSize: "1.3rem", fontFamily: "Outfit", lineHeight: "2.56rem" }}
          fontWeight={500}
        >
          {pageType === "workspace" ? "Workspace" : "Personal"}
        </Link>
        {pageType === "workspace" && (
          <Link
            underline="hover"
            key="1"
            href="/"
            color={alpha(palette.text.light, 0.5)}
            sx={{ cursor: "pointer", fontSize: "1.3rem", fontFamily: "Outfit", lineHeight: "2.56rem" }}
            fontWeight={500}
          >
            {id === "1" && "ITSS Project"}
            {id === "2" && "UX UI Design"}
            {id === "3" && "Software Engineering"}
          </Link>
        )}
        <Link
          underline="hover"
          key="1"
          href="/"
          color={alpha(palette.text.light, 0.5)}
          sx={{ cursor: "pointer", fontSize: "1.3rem", fontFamily: "Outfit", lineHeight: "2.56rem" }}
          fontWeight={500}
        >
          {pageTitle}
        </Link>
      </Breadcrumbs>

      {pageType === "personal" && (
        <Typography
          variant="h3"
          color={palette.primary.main}
          fontWeight={600}
          sx={{ pt: "1rem", pb: "2rem" }}
        >
          {title}
        </Typography>
      )}
      {pageType === "workspace" && (
        <WorkspaceHeader workspaceName="UX UI Design" setPageTitle={setPageTitle}/>
      )}
    </Box>
  );
};

PageHeader.propTypes = {
  title: Proptypes.string,
  pageType: Proptypes.oneOf(["workspace", "personal"]),
};
PageHeader.defaultProps = {
  pageType: "personal",
};
export default PageHeader;
