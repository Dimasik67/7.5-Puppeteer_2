Feature: Booking cinema tickets
   
    Scenario: Should successfully select seats in the hall
        Given user selects movie and session time and goes to the "/client/hall.php" page
        When user selects seats, clicks button and goes to the "/client/payment.php" page
        Then user sees the title "Вы выбрали билеты:"
    
    
    Scenario: Should successfully reserved of vip-seats in the hall
        Given user selects movie and session time and goes to the "/client/hall.php" page
        When user selects vip-seat, clicks button and goes to the "/client/payment.php" page
        Then user clicks button and sees the title "Покажите QR-код нашему контроллеру для подтверждения бронирования."
    
    
    Scenario: Should not reserved occupied seats
        Given user selects movie and session time and goes to the "/client/hall.php" page
        When user selects occupied seats
        Then user cannot book seats because the button is "disabled"