<?php
// app/Enums/UserRole.php
namespace App\Enums;

enum UserRole: int
{
  case ADMIN = 1;
  case MANAGER = 2;
  case EMPLOYEE = 3;
}
