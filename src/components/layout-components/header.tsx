import { authAtom, userProfileAtom } from "../../atoms/auth";
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { Avatar, Button, Stack, Typography } from "@mui/material";
import { useAtom, useAtomValue } from "jotai";
import React from "react";

/**
 * Header component
 *
 * @param props component properties
 */
const Header: React.FC = () => {
  const [auth] = useAtom(authAtom);
  const profileAtom = useAtomValue(userProfileAtom);

  const renderLogOutButton = () => {
    return (
      <Button
        onClick={() => auth?.logout()}
        endIcon={<ExitToAppOutlinedIcon sx={{ color: "grey" }} />}
        style={{
          textTransform: "none",
          flex: 1,
          display: "flex",
          justifyContent: "space-between"
        }}
      />
    )
  }

  return (
    <Stack direction="row-reverse">
      <Stack direction="row">
        <Stack sx={{ marginRight: 2 }}>
          <Avatar>img</Avatar>
        </Stack>
        <Stack>
          <Typography fontWeight="bold">
            {`${profileAtom?.firstName} ${profileAtom?.lastName}`}
          </Typography>
          <Typography>
            {profileAtom?.email}
          </Typography>
        </Stack>
        {renderLogOutButton()}
      </Stack>
    </Stack>
  );
};

export default Header;