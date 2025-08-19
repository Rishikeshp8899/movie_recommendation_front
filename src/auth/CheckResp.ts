interface CheckRespProps {
  response: any;
}

export const CheckResp = ({ response }: CheckRespProps): boolean => {
  if (!response) return false;

  // Check for specific properties in the response
  const { message }: { message?: string } = response;
  console.log("Response message:", message);

  if (message === "Invalid token") {
    localStorage.removeItem("token");
    return false;
  } else {
    // Handle error response
    console.log("Response:", response);
    return true;
  }
}
