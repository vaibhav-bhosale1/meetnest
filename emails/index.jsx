import {
    Body,
    Button,
    Column,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Preview,
    Row,
    Section,
    Text,
  } from '@react-email/components';
  
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';
  
  export const MeetingScheduleEmail = ({
    userFirstName,
    duration,
    meetingTime ,
    date ,
    meetingUrl ,
    businessName,
  }) => {
    return (
      <Html>
        <Head />
        <Body style={main}>
          <Preview>Meeting Scheduled with {businessName}</Preview>
          <Container>
            <Section style={logo}>
              <Img src={`${baseUrl}/static/company-logo.png`} alt="Company logo" />
            </Section>
  
            <Section style={content}>
              <Row>
                <Heading style={{ fontSize: 32, fontWeight: 'bold', textAlign: 'center' }}>
                  Hi {userFirstName},
                </Heading>
                <Heading as="h2" style={{ fontSize: 26, fontWeight: 'bold', textAlign: 'center' }}>
                  Your meeting has been scheduled
                </Heading>
              </Row>
  
              <Row style={boxInfos}>
                <Column>
                  <Text style={paragraph}><b>Business Name:</b> {businessName}</Text>
                  <Text style={{ ...paragraph, marginTop: -5 }}><b>Date:</b> {date}</Text>
                  <Text style={{ ...paragraph, marginTop: -5 }}><b>Time:</b> {meetingTime}</Text>
                  <Text style={{ ...paragraph, marginTop: -5 }}><b>Duration:</b> {duration}</Text>
                  <Text style={{ ...paragraph, marginTop: -5 }}>
                    <b>Meeting Link:</b> <a href={meetingUrl} style={{ color: '#e00707' }}>Join Meeting</a>
                  </Text>
                </Column>
              </Row>
              <Row style={{ ...boxInfos, paddingTop: '0' }}>
                <Column style={buttonContainer} colSpan={2}>
                  <Button style={button} href={meetingUrl}>Join Meeting</Button>
                </Column>
              </Row>
            </Section>
  
            <Text style={{ textAlign: 'center', fontSize: 12, color: 'rgb(0,0,0, 0.7)' }}>
              © 2025 | {businessName} | All Rights Reserved
            </Text>
          </Container>
        </Body>
      </Html>
    );
  };
  
  MeetingScheduleEmail.PreviewProps = {
    userFirstName: 'John Doe',
    duration: '30 minutes',
    meetingTime: '10:00 AM',
    date: 'January 1, 2025',
    meetingUrl: 'https://meeting-link.com',
    businessName: 'Your Company',
  };
  
  export default MeetingScheduleEmail;
  
  const main = {
    backgroundColor: '#fff',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const paragraph = {
    fontSize: 16,
  };
  
  const logo = {
    padding: '30px 20px',
  };
  
  const buttonContainer = {
    textAlign: 'center',
  };
  
  const button = {
    backgroundColor: '#e00707',
    borderRadius: 3,
    color: '#FFF',
    fontWeight: 'bold',
    border: '1px solid rgb(0,0,0, 0.1)',
    cursor: 'pointer',
    display: 'inline-block',
    padding: '12px 30px',
    textDecoration: 'none',
  };
  
  const content = {
    border: '1px solid rgb(0,0,0, 0.1)',
    borderRadius: '3px',
    overflow: 'hidden',
  };
  
  const boxInfos = {
    padding: '20px',
  };