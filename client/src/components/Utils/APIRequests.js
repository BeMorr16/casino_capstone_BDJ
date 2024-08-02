import axios from "axios";
import useUserState from "../../store/store";


export async function addTransaction(transaction) {
  try {
    const token = window.sessionStorage.getItem("token");
    const { data } = await axios.post(
      "https://capstone-casino-backend.onrender.com/transaction/add",
      transaction,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function addMiniGame(miniGame) {
  try {
    const token = window.sessionStorage.getItem("token");
    const { data } = await axios.post(
      "https://capstone-casino-backend.onrender.com/transaction/add",
      miniGame,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}


export async function registerUser(formData) {
  try {
    const {data} = await axios.post(
      "https://capstone-casino-backend.onrender.com/user/register",
      formData
    );
    if (data.token) {
        window.sessionStorage.setItem("token", data.token);
        const { id, user_money, username } = data;
      useUserState.getState().setUser(id, user_money, username);
      useUserState.getState().setIsLoggedIn(true);
    }
    return data;
  } catch (error) {
    console.log(error);
    throw error; 
  }
}

export async function loginUser(formData) {
  try {
      const { data } = await axios.post(
          "https://capstone-casino-backend.onrender.com/user/login",
          formData
      );
    if (data.token) {
        window.sessionStorage.setItem("token", data.token);
        const { id, user_money, username } = data;
      useUserState.getState().setUser(id, user_money, username);
      useUserState.getState().setIsLoggedIn(true);
    }
    return data;
  } catch (error) {
    console.log(error);
    throw error; 
  }
}

export async function betLeaderboardRequest() {
  try {
    const { data } = await axios.get(
      "https://capstone-casino-backend.onrender.com/leaderboard/transaction"
    );
    return data;
  } catch (error) {
    console.log(error)
  }
}

export async function recordLeaderboardRequest() {
  try {
    const { data } = await axios.get(
      "https://capstone-casino-backend.onrender.com/leaderboard/user/record"
    );
    return data;
  } catch (error) {
    console.log(error)
  }
}

export async function moneyLeaderboardRequest() {
  try {
    const { data } = await axios.get(
      "https://capstone-casino-backend.onrender.com/leaderboard/user"
    );
    return data;
  } catch (error) {
    console.log(error)
  }
}


export async function authorizeUserRequest() {
  try {
    const token = window.sessionStorage.getItem("token");
    const { data } = await axios.get("https://capstone-casino-backend.onrender.com/user", 
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error)
    throw error
  }
}
export async function editUserRequest(user) {
  try {
    const token = window.sessionStorage.getItem("token");
    const { data } = await axios.put("https://capstone-casino-backend.onrender.com/user/edit",
    user,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getUserBetSlipsRequest(gameSelection, winOrLoss) {
  try {
    const url = `https://capstone-casino-backend.onrender.com/transaction/history/${gameSelection}/${winOrLoss}`;
    const token = window.sessionStorage.getItem("token");
    const { data } = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return data
  } catch (error) {
    console.error('Error fetching user bet slips:', error);
    throw new Error('Failed to fetch user bet slips');
  }
  
}

export const minigameLeaderboardRequest = async () => {
  try {
    const { data } = await axios.get(
      "https://capstone-casino-backend.onrender.com/leaderboard/minigame"
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const perfectMinigameLeaderboardRequest = async () => {
  try {
    const { data } = await axios.get(
      "https://capstone-casino-backend.onrender.com/leaderboard/minigame/perfect"
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};