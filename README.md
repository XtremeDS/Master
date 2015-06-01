# interfaceBuilder

- AirSoft interface project;
- This interface is generic to all apps (operator, comsys and master);
- To do this, we are implementing it with an aux variable:
    controllers.js
    // Set appType - 0:Operator 1:ComSys 2:Master
    scope.appType = 0;
- Nato Ranks definition:
    Country:
        "NLT"-Not listed
        "BEL"-Belgium
        "BG"-Bulgaria
        "GB"-British Army
        "CA"-Canada
        "HR"-Croacia
        "CZ"-Czech Republic
        "DK"-Denmark
        "EE"-Estonia
        "FR"-France
        "DE"-Germany
        "GR"-Greece
        "HU"-Hungary
        "IS"-Iceland
        "IT"-Italy
        "LV"-Latvia
        "LT"-Lithuania
        "NL"-Netherlands
        "NO"-Norway
        "PL"-Poland
        "PT"-Portugal
        "RO"-Romania
        "SI"-Slovenia
        "ES"-Spain
        "TR"-Turkey
        "US"-United States
    Ranks:
        "OR-01"-Private
        "OR-02"-Private First Class
        "OR-03"-Specialist
        "OR-04"-Corporal
        "OR-05"-Sergeant
        "OR-06"-Staff Sergeant