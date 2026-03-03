import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Iter "mo:core/Iter";
import Time "mo:core/Time";

actor {
  type CategoryFortune = {
    score : Nat;
    message : Text;
  };

  type LuckReading = {
    overallMessage : Text;
    love : CategoryFortune;
    career : CategoryFortune;
    health : CategoryFortune;
    finance : CategoryFortune;
    luckyNumber : Nat;
    luckyColor : Text;
    luckyTimeOfDay : Text;
  };

  let overallFortunes = [
    "Today is a day full of surprises. Embrace the unexpected.",
    "Patience will bring you great rewards today.",
    "A positive attitude will attract good fortune.",
    "Challenges will turn into opportunities.",
    "Trust your instincts and they will guide you.",
  ];

  let loveFortunes = [
    "Open your heart to new possibilities.",
    "Communication is key in relationships.",
    "A romantic adventure awaits you.",
    "Express your feelings honestly.",
    "Take time to appreciate your loved ones.",
  ];

  let careerFortunes = [
    "Hard work will be recognized today.",
    "New opportunities are on the horizon.",
    "Collaboration will bring success.",
    "Stay focused on your goals.",
    "Take initiative and lead the way.",
  ];

  let healthFortunes = [
    "Balance is important for your well-being.",
    "A healthy change will benefit you.",
    "Listen to your body's needs.",
    "Physical activity brings positive energy.",
    "Rest and relaxation are needed.",
  ];

  let financeFortunes = [
    "Wise investments will pay off.",
    "Be cautious with spending today.",
    "Unexpected gains are coming your way.",
    "Plan for the future.",
    "Generosity will bring rewards.",
  ];

  let colors = [
    "Red", "Blue", "Green", "Yellow", "Purple", "Orange", "Pink", "Black", "White", "Gold"
  ];

  let timesOfDay = [
    "Morning", "Afternoon", "Evening", "Night", "Midday", "Sunrise", "Sunset"
  ];

  func deterministicIndex(seed : Nat, arraySize : Nat) : Nat {
    seed % arraySize;
  };

  func getSeedFromDate() : Nat {
    let time = Time.now();
    let secondsInDay = 86_400_000_000_000;
    ((time / 1_000_000_000) / secondsInDay).toNat();
  };

  public query ({ caller }) func getTodaysLuck() : async LuckReading {
    let seed = getSeedFromDate();

    let overallMessage = overallFortunes[deterministicIndex(seed, overallFortunes.size())];
    let love = {
      score = (deterministicIndex(seed * 3, 5)) + 1;
      message = loveFortunes[deterministicIndex(seed * 3, loveFortunes.size())];
    };
    let career = {
      score = (deterministicIndex(seed * 5, 5)) + 1;
      message = careerFortunes[deterministicIndex(seed * 5, careerFortunes.size())];
    };
    let health = {
      score = (deterministicIndex(seed * 7, 5)) + 1;
      message = healthFortunes[deterministicIndex(seed * 7, healthFortunes.size())];
    };
    let finance = {
      score = (deterministicIndex(seed * 11, 5)) + 1;
      message = financeFortunes[deterministicIndex(seed * 11, financeFortunes.size())];
    };

    let luckReading : LuckReading = {
      overallMessage;
      love;
      career;
      health;
      finance;
      luckyNumber = (deterministicIndex(seed * 13, 99)) + 1;
      luckyColor = colors[deterministicIndex(seed * 17, colors.size())];
      luckyTimeOfDay = timesOfDay[deterministicIndex(seed * 19, timesOfDay.size())];
    };
    luckReading;
  };
};
