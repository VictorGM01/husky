import express, { Request, Response } from "express";
import {
  convertFahrenheitToCelsius,
  convertCelsiusToFahrenheit,
} from "./tempConverter";

const app = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Temperature Conversion API");
});

app.get(
  "/api/convert/ftoc/:temp",
  (req: Request<{ temp: string }>, res: Response) => {
    const fahrenheit = parseFloat(req.params.temp);

    if (isNaN(fahrenheit)) {
      return res.status(400).json({ error: "Invalid temperature value" });
    }

    const celsius = convertFahrenheitToCelsius(fahrenheit);
    res.json({
      fahrenheit,
      celsius,
      message: `${fahrenheit}°F is equal to ${celsius}°C`,
    });
  }
);

app.get(
  "/api/convert/ctof/:temp",
  (req: Request<{ temp: string }>, res: Response) => {
    const celsius = parseFloat(req.params.temp);

    if (isNaN(celsius)) {
      return res.status(400).json({ error: "Invalid temperature value" });
    }

    const fahrenheit = convertCelsiusToFahrenheit(celsius);
    res.json({
      celsius,
      fahrenheit,
      message: `${celsius}°C is equal to ${fahrenheit}°F`,
    });
  }
);

export default app;
