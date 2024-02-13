//Created by Georgina Alacaraz

import { Button, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
//for community page


interface CommunityType {
  _id: string; // Make sure _id is defined in the CommunityType interface
  name: string;
  description: string;
  // price: number,
}

export default function ProfileCard(props: CommunityType) {
  return (
    <Grid container style={{ margin: 20, padding: 16, borderRadius: 8, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
      {/* Profile Details */}
      <Grid item xs={12}>
        <Typography variant="h5" style={{ marginBottom: 8 }}>{props.name}</Typography>
        <Typography variant="body1" style={{ color: '#666', marginBottom: 16 }}>{props.description}</Typography>
        {/* Social Links */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton>
            <EditIcon />
          </IconButton>
          <Typography variant="body2" style={{ color: '#888', marginRight: 8 }}>Edit Profile</Typography>
        </div>
      </Grid>
    </Grid>
  );
}
