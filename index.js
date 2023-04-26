"use strict";

// Add enum for expense type and expense name - DONE
// Travel expenses - by date - DONE
// Expense has type - meal, travel, entertainment etc - DONE
// Each expenseType has sub types - meal -> breakfast, lunch, dinner - DONE
// Calculate expense by type, date range - if type is not passed, it should calcualte and return total expenses instead
// If an expense if over spent, log it in print

// class for Expense - takes type, subtype, amount, data as input
// class for Expense - takes typeName
// add sub type for expense by passing subtypeName, maxSpendLimit

class ExpenseSubType {
  constructor(displayName, maxSpendLimit) {
    this.displayName = displayName;
    this.maxSpendLimit = maxSpendLimit;
  }
}

const EXPENSE_TYPES = {
  MEAL: 1,
  TRAVEL: 2,
};
const EXPENSE_TYPE_DISPLAY_NAMES = {
  [EXPENSE_TYPES.MEAL]: "Meal",
  [EXPENSE_TYPES.TRAVEL]: "Travel",
};

const EXPENSE_MEAL_TYPES = {
  BREAKFAST: 3,
  LUNCH: 4,
  DINNER: 5,
};
const EXPENSE_MEAL_TYPE_META = {
  [EXPENSE_MEAL_TYPES.BREAKFAST]: new ExpenseSubType("Breakfast", 20),
  [EXPENSE_MEAL_TYPES.LUNCH]: new ExpenseSubType("Lunch", 50),
  [EXPENSE_MEAL_TYPES.DINNER]: new ExpenseSubType("Dinner", 100),
};

const EXPENSE_TRAVEL_TYPES = {
  CAR_RENTAL: 6,
  METRO: 7,
  BUS: 8,
};
const EXPENSE_TRAVEL_TYPE_META = {
  [EXPENSE_TRAVEL_TYPES.CAR_RENTAL]: new ExpenseSubType("Car Rental", null),
  [EXPENSE_TRAVEL_TYPES.METRO]: new ExpenseSubType("Metro", null),
  [EXPENSE_TRAVEL_TYPES.BUS]: new ExpenseSubType("Bus", null),
};

const EXPENSE_TYPES_META = {
  [EXPENSE_TYPES.MEAL]: EXPENSE_MEAL_TYPE_META,
  [EXPENSE_TYPES.TRAVEL]: EXPENSE_TRAVEL_TYPE_META,
};

const myExpenses = () => [
  new Expense({
    expenseType: EXPENSE_TYPES.TRAVEL,
    expenseSubType: EXPENSE_TRAVEL_TYPES.CAR_RENTAL,
    amount: 90,
    dateOfExpense: "2023-04-15",
  }),
  new Expense({
    expenseType: EXPENSE_TYPES.MEAL,
    expenseSubType: EXPENSE_MEAL_TYPES.BREAKFAST,
    amount: 30,
    dateOfExpense: "2023-04-15",
  }),
  new Expense({
    expenseType: EXPENSE_TYPES.MEAL,
    expenseSubType: EXPENSE_MEAL_TYPES.LUNCH,
    amount: 40,
    dateOfExpense: "2023-04-15",
  }),
  new Expense({
    expenseType: EXPENSE_TYPES.MEAL,
    expenseSubType: EXPENSE_MEAL_TYPES.DINNER,
    amount: 80,
    dateOfExpense: "2023-04-15",
  }),
  new Expense({
    expenseType: EXPENSE_TYPES.TRAVEL,
    expenseSubType: EXPENSE_TRAVEL_TYPES.METRO,
    amount: 10,
    dateOfExpense: "2023-04-17",
  }),
  new Expense({
    expenseType: EXPENSE_TYPES.MEAL,
    expenseSubType: EXPENSE_MEAL_TYPES.BREAKFAST,
    amount: 30,
    dateOfExpense: "2023-04-17",
  }),
  new Expense({
    expenseType: EXPENSE_TYPES.MEAL,
    expenseSubType: EXPENSE_MEAL_TYPES.LUNCH,
    amount: 60,
    dateOfExpense: "2023-04-17",
  }),
  new Expense({
    expenseType: EXPENSE_TYPES.MEAL,
    expenseSubType: EXPENSE_MEAL_TYPES.DINNER,
    amount: 90,
    dateOfExpense: "2023-04-17",
  }),
  new Expense({
    expenseType: EXPENSE_TYPES.TRAVEL,
    expenseSubType: EXPENSE_TRAVEL_TYPES.BUS,
    amount: 30,
    dateOfExpense: "2023-04-20",
  }),
  new Expense({
    expenseType: EXPENSE_TYPES.MEAL,
    expenseSubType: EXPENSE_MEAL_TYPES.BREAKFAST,
    amount: 10,
    dateOfExpense: "2023-04-20",
  }),
  new Expense({
    expenseType: EXPENSE_TYPES.MEAL,
    expenseSubType: EXPENSE_MEAL_TYPES.LUNCH,
    amount: 70,
    dateOfExpense: "2023-04-20",
  }),
  new Expense({
    expenseType: EXPENSE_TYPES.MEAL,
    expenseSubType: EXPENSE_MEAL_TYPES.DINNER,
    amount: 110,
    dateOfExpense: "2023-04-20",
  }),
];

class Expense {
  // private variables
  // #expenseType;
  // #expenseSubType;
  // #amount;
  // #dateOfExpense;
  // #expenseTypeDisplayName;
  // #expenseSubTypeDisplayName;
  constructor({ expenseType, expenseSubType, amount, dateOfExpense }) {
    this.expenseType = expenseType;
    this.expenseSubType = expenseSubType;
    this.amount = amount;
    this.dateOfExpense = dateOfExpense;
    this.expenseTypeDisplayName = this.getExpenseTypeDN();
    this.expenseSubTypeDisplayName = this.getExpenseSubtypeDN();
  }

  // private method
  getExpenseSubtypeDN() {
    return EXPENSE_TYPES_META[this.expenseType][this.expenseSubType]
      .displayName;
  }

  // private method
  getExpenseTypeDN() {
    return EXPENSE_TYPE_DISPLAY_NAMES[this.expenseType];
  }

  getAmount() {
    return this.amount;
  }

  getIsExpenseType(expenseType) {
    return expenseType ? this.expenseType === expenseType : false;
  }

  getIsExpenseSubType(expenseSubType) {
    return expenseSubType ? this.expenseSubType === expenseSubType : false;
  }

  getDoeIsEqualTo(date) {
    return date ? this.dateOfExpense === date : false;
  }

  getDoeIsGte(date) {
    return date ? this.dateOfExpense >= date : false;
  }

  getDoeIsLte(date) {
    return date ? this.dateOfExpense <= date : false;
  }

  isExpenseOverSpent() {
    const expMaxSpendLimit =
      EXPENSE_TYPES_META[this.expenseType][this.expenseSubType].maxSpendLimit;
    return expMaxSpendLimit ? this.amount > expMaxSpendLimit : false;
  }

  getLogToScreenTxt() {
    const overSpentMarker = this.isExpenseOverSpent() ? "[over-expense!]" : "";
    return (
      this.expenseSubTypeDisplayName +
      "\t" +
      this.amount +
      "eur" +
      "\t" +
      this.dateOfExpense +
      "\t" +
      overSpentMarker
    );
  }
}

class ExpenseReport {
  // private variables
  // #expenses;
  constructor(expenses) {
    this.expenses = expenses;
  }

  // private method
  calculateTotalForExpenses(expenses) {
    let total = 0;
    expenses.forEach((exp) => {
      total += exp.getAmount();
    });
    return total;
  }

  // private method
  getDateLogText({ startDate, endDate }) {
    let txt = "";
    if (startDate && endDate) {
      if (startDate === endDate) {
        txt += `for the date ${startDate}`;
      } else {
        txt += `for the date range ${startDate} - ${endDate}`;
      }
    } else if (startDate) {
      txt += `from the date ${startDate}`;
    } else if (endDate) {
      txt += `until the date ${endDate}`;
    }
    return txt;
  }

  // private method
  getExpenseSubtypeDisplayName(expenseSubType) {
    let expSubtypeDisplayName = "";
    Object.keys(EXPENSE_TYPES_META).forEach((expTypeKey) => {
      const expSubTypeMeta = EXPENSE_TYPES_META[expTypeKey];
      const matchingKey = Object.keys(expSubTypeMeta).find(
        (expSubTypeKey) => expSubTypeKey === expenseSubType.toString()
      );
      if (matchingKey) {
        expSubtypeDisplayName = expSubTypeMeta[expenseSubType].displayName;
      }
    });
    return expSubtypeDisplayName;
  }

  // private method
  buildExpenseFinalScreenLog({
    expenseType,
    expenseSubType,
    startDate,
    endDate,
    total,
  }) {
    let txt = `Total expense ${expenseType || expenseSubType ? "for " : ""}`;
    // Total expense for type meal and subtype breakfast between date range is or for date is total;
    if (expenseType) {
      txt += `type ${EXPENSE_TYPE_DISPLAY_NAMES[expenseType]}`;
      if (expenseSubType) {
        txt += `, subtype ${EXPENSE_TYPES_META[expenseType][expenseSubType].displayName}`;
      }
    } else if (expenseSubType) {
      const expSubtypeDisplayName =
        this.getExpenseSubtypeDisplayName(expenseSubType);
      txt += expSubtypeDisplayName ? `subtype ${expSubtypeDisplayName}` : "";
    }
    txt += `${this.getDateLogText({ startDate, endDate })} is ${total}`;
    return txt;
  }

  // private method
  getExpensesForDateRange({ startDate, endDate, exps }) {
    let dateFilteredExps = exps;
    if (startDate && endDate) {
      if (startDate === endDate) {
        dateFilteredExps = dateFilteredExps.filter((exp) =>
          exp.getDoeIsEqualTo(startDate)
        );
      } else {
        dateFilteredExps = dateFilteredExps.filter((exp) =>
          exp.getDoeIsGte(startDate)
        );
        dateFilteredExps = dateFilteredExps.filter((exp) =>
          exp.getDoeIsLte(endDate)
        );
      }
    } else if (startDate) {
      dateFilteredExps = dateFilteredExps.filter((exp) =>
        exp.getDoeIsGte(startDate)
      );
    } else if (endDate) {
      dateFilteredExps = dateFilteredExps.filter((exp) =>
        exp.getDoeIsLte(endDate)
      );
    }
    return dateFilteredExps;
  }

  getExpenses({
    expenseType,
    expenseSubType,
    startDate,
    endDate,
    isOverSpent,
    logToScreen,
  }) {
    let exps = this.expenses;
    if (expenseType) {
      exps = exps.filter((exp) => exp.getIsExpenseType(expenseType));
    }
    if (expenseSubType) {
      exps = exps.filter((exp) => exp.getIsExpenseSubType(expenseSubType));
    }
    if (isOverSpent) {
      exps = exps.filter((exp) => exp.isExpenseOverSpent());
    }
    exps = this.getExpensesForDateRange({ startDate, endDate, exps });
    const total = this.calculateTotalForExpenses(exps);
    const totalScreenLog = this.buildExpenseFinalScreenLog({
      expenseType,
      expenseSubType,
      startDate,
      endDate,
      total,
    });
    if (logToScreen) {
      let logTxt = "";
      exps.forEach((exp) => (logTxt += exp.getLogToScreenTxt() + "\n"));
      console.info(logTxt);
    }
    return { total, totalScreenLog, expenses: exps };
  }
}

const myExpenseReport = new ExpenseReport(myExpenses());

console.log({
  exppp: myExpenseReport.getExpenses({
    expenseType: EXPENSE_TYPES.MEAL,
    logToScreen: true,
  }),
});
console.log({
  exppp: myExpenseReport.getExpenses({
    expenseType: EXPENSE_TYPES.MEAL,
    expenseSubType: EXPENSE_MEAL_TYPES.BREAKFAST,
  }),
});
console.log({
  exppp: myExpenseReport.getExpenses({
    expenseSubType: EXPENSE_MEAL_TYPES.BREAKFAST,
  }),
});
console.log({
  exppp: myExpenseReport.getExpenses({ expenseType: EXPENSE_TYPES.TRAVEL }),
});
console.log({
  exppp: myExpenseReport.getExpenses({ startDate: "2023-04-30" }),
});
console.log({
  exppp: myExpenseReport.getExpenses({ startDate: "2023-04-10" }),
});
console.log({ exppp: myExpenseReport.getExpenses({ endDate: "2023-04-30" }) });
console.log({ exppp: myExpenseReport.getExpenses({ endDate: "2023-04-10" }) });
console.log({
  exppp: myExpenseReport.getExpenses({
    startDate: "2023-04-10",
    endDate: "2023-04-15",
  }),
});
console.log({
  exppp: myExpenseReport.getExpenses({
    startDate: "2023-04-10",
    endDate: "2023-04-25",
  }),
}); // total
console.log({
  exppp: myExpenseReport.getExpenses({
    startDate: "2023-04-25",
    endDate: "2023-04-30",
  }),
});
console.log({
  exppp: myExpenseReport.getExpenses({ isOverSpent: true, logToScreen: true }),
});
