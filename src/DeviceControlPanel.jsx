import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { ref, set, onValue } from "firebase/database";

const DeviceControlPanel = () => {
  const [deviceId, setDeviceId] = useState("");
  const [command, setCommand] = useState("");
  const [deviceStatus, setDeviceStatus] = useState("");

  const sendCommand = async () => {
    if (!deviceId || !command) {
      alert("Please enter both Device ID and Command!");
      return;
    }

    try {
      await set(ref(db, `devices/${deviceId}`), {
        status: command,
      });
      alert(`Command "${command}" sent successfully to ${deviceId}`);
    } catch (error) {
      console.error("Error sending command:", error);
      alert("Failed to send command.");
    }
  };

  useEffect(() => {
    if (!deviceId) return;

    const statusRef = ref(db, `devices/${deviceId}`);
    const unsubscribe = onValue(statusRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setDeviceStatus(data.status);
      } else {
        setDeviceStatus("No status yet...");
      }
    });

    // Cleanup listener on unmount or deviceId change
    return () => unsubscribe();
  }, [deviceId]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>SafePhone Control Panel</h1>
      
      <input
        style={styles.input}
        type="text"
        placeholder="Enter Device ID"
        value={deviceId}
        onChange={(e) => setDeviceId(e.target.value)}
      />
      
      <select
        style={styles.input}
        value={command}
        onChange={(e) => setCommand(e.target.value)}
      >
        <option value="">Select Command</option>
        <option value="LOCK">Lock Device</option>
        <option value="LOCATE">Locate Device</option>
        <option value="WIPE">Wipe Device</option>
      </select>
      
      <button style={styles.button} onClick={sendCommand}>
        Send Command
      </button>

      {deviceStatus && (
        <div style={styles.status}>
          <strong>Device Status:</strong> {deviceStatus}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    maxWidth: 400,
    margin: "50px auto",
    padding: 20,
    border: "1px solid #ccc",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    margin: "10px 0",
    borderRadius: 5,
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: 12,
    backgroundColor: "#4CAF50",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
  status: {
    marginTop: 20,
    fontSize: 18,
    color: "#333",
  },
};

export default DeviceControlPanel;
