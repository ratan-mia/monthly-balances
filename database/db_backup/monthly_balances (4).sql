-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 04, 2024 at 04:49 PM
-- Server version: 5.7.24
-- PHP Version: 8.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `monthly_balances`
--

-- --------------------------------------------------------

--
-- Table structure for table `account_types`
--

CREATE TABLE `account_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `account_types`
--

INSERT INTO `account_types` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'CD A/C', 'dddd', '2024-11-26 02:16:56', '2024-11-27 03:27:35'),
(2, 'SND A/C', 'sfsfsfsfs', '2024-11-26 02:17:11', '2024-11-27 03:27:41'),
(3, 'Current', NULL, '2024-11-30 06:02:56', '2024-11-30 06:02:56'),
(4, 'CD', NULL, '2024-11-30 06:03:21', '2024-11-30 06:03:21');

-- --------------------------------------------------------

--
-- Table structure for table `balances`
--

CREATE TABLE `balances` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `company_id` bigint(20) UNSIGNED NOT NULL,
  `bank_id` bigint(20) UNSIGNED DEFAULT NULL,
  `account_type_id` bigint(20) UNSIGNED DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `account_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `opening_balance` decimal(15,2) NOT NULL,
  `inflows` decimal(15,2) DEFAULT NULL,
  `outflows` decimal(15,2) DEFAULT NULL,
  `closing_balance` decimal(15,2) DEFAULT NULL,
  `fund_utilized` decimal(15,2) DEFAULT NULL,
  `remaining_balance` decimal(15,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `company` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `balances`
--

INSERT INTO `balances` (`id`, `company_id`, `bank_id`, `account_type_id`, `user_id`, `account_number`, `opening_balance`, `inflows`, `outflows`, `closing_balance`, `fund_utilized`, `remaining_balance`, `created_at`, `updated_at`, `company`) VALUES
(1, 3, 2, NULL, 2, '0702-01701908', '10.00', '5.00', '2.00', '13.00', NULL, NULL, '2024-11-28 00:55:38', '2024-12-01 01:19:04', NULL),
(2, 4, 2, NULL, 2, '5dgdgg', '50.00', '10.00', '5.00', '55.00', NULL, NULL, '2024-11-28 05:13:43', '2024-12-01 02:03:21', NULL),
(3, 1, 1, NULL, 2, 'sklfsjfsfwsljw', '100.00', '10.00', '5.00', '105.00', NULL, NULL, '2024-12-28 05:50:06', '2024-12-28 06:23:41', NULL),
(4, 2, 1, NULL, 2, 'ssfsfswfsf', '500.00', '20.00', '30.00', '490.00', NULL, NULL, '2024-11-28 06:30:40', '2024-11-28 06:31:03', NULL),
(5, 1, 1, NULL, 2, 'kjkjhjg', '105.00', '30.00', '20.00', '115.00', NULL, NULL, '2024-11-28 06:37:27', '2024-11-28 06:37:27', NULL),
(6, 2, 4, 2, 2, '1200005281695', '264691.44', '55555.00', '97.00', '320149.44', NULL, NULL, '2024-12-04 01:39:14', '2024-12-04 01:39:14', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `banks`
--

CREATE TABLE `banks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `branch` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `account_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `banks`
--

INSERT INTO `banks` (`id`, `name`, `branch`, `account_number`, `address`, `contact_number`, `created_at`, `updated_at`) VALUES
(1, 'Dhaka Bank Limited', 'Gulshan', '102 100 4103', 'Dhaka North City Corporation, Dhaka-1212', '+8802 58314424', '2024-11-24 04:46:08', '2024-12-01 00:38:36'),
(2, 'Bank Alfalah Ltd.', 'Gulshan', '0702-01701908', 'House No. 168, Gulshan North Ave, Dhaka 1212', '02-9896782', '2024-11-25 04:46:50', '2024-12-01 00:40:01'),
(3, 'Mutual Trust Bank Ltd', NULL, '1301010123049', NULL, NULL, '2024-12-01 01:33:58', '2024-12-01 01:33:58'),
(4, 'National Bank', 'Gulshan', '1200005281695', '277, Tejgaon I/A', '01751010966', '2024-12-01 01:34:45', '2024-12-01 01:34:45');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`id`, `name`, `created_at`, `updated_at`, `address`, `email`, `phone`) VALUES
(1, 'Asian Imports Limited', '2024-11-20 03:45:33', '2024-11-20 03:45:33', '8751 Jarred Lakes, Tejgaon I/A, Dhaka', 'henderson93@hayes.biz', '+1.214.925.6025'),
(2, 'Continental Motors', '2024-11-20 03:45:34', '2024-11-20 03:45:34', '70576 Nolan Track, Tejgaon I/A, Dhaka', 'zondricka@ohara.org', '(503) 738-6414'),
(3, 'Auto Imports Limited', '2024-11-20 03:45:34', '2024-11-20 03:45:34', '891 Rey Plains Suite 008, Tejgaon I/A, Dhaka', 'lavinia.moen@feest.com', '785-456-7462'),
(4, 'Auto Distributions Ltd', '2024-11-20 03:45:34', '2024-11-20 03:45:34', '843 Mafalda Parks Apt. 646, Tejgaon I/A, Dhaka', 'bradtke.leonora@wiza.com', '507-665-8971'),
(5, 'Asian Petroleum Limited', '2024-11-20 03:45:34', '2024-11-20 03:45:34', '776 Pierce Spur Apt. 079, Tejgaon I/A, Dhaka', 'cynthia26@mante.com', '+15349522449'),
(6, 'Kawasaki Bangladesh', '2024-11-23 04:54:36', '2024-11-23 04:54:56', '277, Tejgaon I/A', 'sales@continental-motor.com', '01751010966');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `loans`
--

CREATE TABLE `loans` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `company_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `bank_id` bigint(20) UNSIGNED NOT NULL,
  `limit` decimal(15,2) NOT NULL,
  `occupied_balance` decimal(15,2) NOT NULL DEFAULT '0.00',
  `available_balance` decimal(15,2) NOT NULL DEFAULT '0.00',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `loan_type_id` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `loans`
--

INSERT INTO `loans` (`id`, `company_id`, `user_id`, `bank_id`, `limit`, `occupied_balance`, `available_balance`, `created_at`, `updated_at`, `loan_type_id`) VALUES
(1, 1, 2, 1, '42600000.00', '37638008.75', '4961991.25', '2024-12-03 05:50:16', '2024-12-03 06:29:37', 1),
(2, 6, 4, 3, '5113591.37', '4945414.37', '168177.00', '2025-01-04 02:53:29', '2025-01-04 02:53:29', 1);

-- --------------------------------------------------------

--
-- Table structure for table `loan_types`
--

CREATE TABLE `loan_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `loan_types`
--

INSERT INTO `loan_types` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'SOD', NULL, '2024-12-03 06:29:00', '2024-12-03 06:29:00');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2024_11_18_092303_create_repayment_schedules_table', 1),
(5, '2024_11_20_060526_create_balances_table', 1),
(6, '2024_11_20_061513_create_companies_table', 1),
(7, '2024_11_20_061605_create_roles_table', 1),
(8, '2024_11_20_065001_add_foreign_keys_to_users_table', 2),
(9, '2024_11_20_065416_add_company_foreign_key_to_balances_table', 3),
(10, '2024_11_20_092217_add_fields_to_companies_table', 4),
(11, '2024_11_20_114514_add_default_role_to_users_table', 5),
(12, '2024_11_23_125335_add_additional_fields_to_balances_table', 6),
(13, '2024_11_24_103104_create_banks_table', 7),
(14, '2024_11_25_113555_create_account_types_table', 8),
(15, '2024_11_27_113006_add_closing_balance_to_balance_table', 9),
(16, '2024_11_27_115202_add_bank_id_to_balances_table', 10),
(17, '2024_11_27_120822_add_user_id_to_balances_table', 11),
(20, '2024_11_27_125039_add_account_type_id_to_balances_table', 12),
(21, '2024_12_02_054138_create_permission_tables', 13),
(22, '2024_12_03_112833_create_loans_table', 14),
(23, '2024_12_03_120625_create_loan_types_table', 15),
(24, '2024_12_03_121047_add_loan_type_id_to_loans_table', 16);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 2),
(2, 'App\\Models\\User', 4);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'view_dashboard', 'web', '2024-12-02 00:32:56', '2024-12-02 00:32:56'),
(2, 'edit_post', 'web', '2024-12-02 00:32:56', '2024-12-02 00:32:56');

-- --------------------------------------------------------

--
-- Table structure for table `repayment_schedules`
--

CREATE TABLE `repayment_schedules` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `company` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `institutes` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `loan_account_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `loan_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `limit` decimal(15,2) DEFAULT NULL,
  `outstanding` decimal(15,2) DEFAULT NULL,
  `disbursement_date` date DEFAULT NULL,
  `rate_of_interest` double DEFAULT NULL,
  `tenor` int(11) DEFAULT NULL,
  `repayment_dates` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'web', '2024-12-02 00:32:56', '2024-12-02 00:32:56'),
(2, 'user', 'web', '2024-12-02 00:32:56', '2024-12-02 00:32:56');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('swlC9WZ2CUW32L8zHjUYMV9MTLHLjadXu9OlPytW', 2, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicFQ3dTkyU1Z2TEI0QzNCbU42MGt6ODh6aXV0ZWVUblVmOG5zaEp6TCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6Mjt9', 1733309028);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company_id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `company_id`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(2, 'Ratan Mia', 2, 'ratan.mia@continental-motor.com', NULL, '$2y$12$ap0VKOR9lbmhEnB5ik6rEeiy78eJLNoI3yKagCSKL0hKruXcH5E0K', 'haiH5lQXu0SH7nLf7W5dYEXjBByBRblzoQpSvknUD64yd4VN6dqXWJsp68Bm', '2024-11-20 05:53:40', '2024-11-20 05:53:40'),
(4, 'Shorifull Islam', 3, 'ratan.mia@kawasaki.com.bd', NULL, '$2y$12$AUbDaHAFd6Ey0zPBEK41M.SU/tEAjNBnUHRmQBTUkcnwmLfCuh0v2', NULL, '2024-12-02 06:38:08', '2024-12-02 06:38:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account_types`
--
ALTER TABLE `account_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `balances`
--
ALTER TABLE `balances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `balances_company_id_foreign` (`company_id`),
  ADD KEY `balances_bank_id_foreign` (`bank_id`),
  ADD KEY `balances_user_id_foreign` (`user_id`),
  ADD KEY `balances_account_type_id_foreign` (`account_type_id`);

--
-- Indexes for table `banks`
--
ALTER TABLE `banks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `companies_email_unique` (`email`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `loans`
--
ALTER TABLE `loans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `loans_company_id_foreign` (`company_id`),
  ADD KEY `loans_user_id_foreign` (`user_id`),
  ADD KEY `loans_bank_id_foreign` (`bank_id`),
  ADD KEY `loans_loan_type_id_foreign` (`loan_type_id`);

--
-- Indexes for table `loan_types`
--
ALTER TABLE `loan_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `repayment_schedules`
--
ALTER TABLE `repayment_schedules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_company_id_foreign` (`company_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account_types`
--
ALTER TABLE `account_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `balances`
--
ALTER TABLE `balances`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `banks`
--
ALTER TABLE `banks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `loans`
--
ALTER TABLE `loans`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `loan_types`
--
ALTER TABLE `loan_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `repayment_schedules`
--
ALTER TABLE `repayment_schedules`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `balances`
--
ALTER TABLE `balances`
  ADD CONSTRAINT `balances_account_type_id_foreign` FOREIGN KEY (`account_type_id`) REFERENCES `account_types` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `balances_bank_id_foreign` FOREIGN KEY (`bank_id`) REFERENCES `banks` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `balances_company_id_foreign` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `balances_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `loans`
--
ALTER TABLE `loans`
  ADD CONSTRAINT `loans_bank_id_foreign` FOREIGN KEY (`bank_id`) REFERENCES `banks` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `loans_company_id_foreign` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `loans_loan_type_id_foreign` FOREIGN KEY (`loan_type_id`) REFERENCES `loan_types` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `loans_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_company_id_foreign` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
