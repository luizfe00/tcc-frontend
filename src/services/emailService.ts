export const handleSendEmail = async (
  emails: string | string[],
  subject: string,
  message: string
) => {
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emails}&su=${subject}&body=${message}`;

  window.open(gmailUrl, "_blank");
};
